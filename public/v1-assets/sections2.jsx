const NS2=window.ToNCUADVDesignSystem_ce468e||{};
const {Button,FilterBar,FilterChip,Select,LocationCard,CaseStudyCard,Field,Input,Textarea,Checkbox,MapMarker,MapPopup,StatusPill,AIScoreBadge,Toast,QuoteTray}=NS2;
const D2=window.TCG_DATA;

const ESRI_TILES='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const OSM_TILES='https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png';
function statusPillStyle(st){
  const c=st==='booked'?{bg:'rgba(244,114,182,.18)',fg:'#F472B6',label:'Đã thuê'}:st==='soon'?{bg:'rgba(245,158,11,.18)',fg:'#F59E0B',label:'Sắp hết'}:{bg:'rgba(45,212,191,.16)',fg:'#2DD4BF',label:'Còn trống'};
  return c;
}
function MapPreview(){
  return <section id="map" style={{background:'#fff',padding:'96px 0',overflow:'hidden'}}>
    <style>{'.map-cta{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.map-cta:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg)}.map-pulse{animation:mappulse 2s ease-in-out infinite}@keyframes mappulse{0%,100%{box-shadow:0 0 0 0 rgba(35,116,217,.45)}50%{box-shadow:0 0 0 8px rgba(35,116,217,0)}}@media (prefers-reduced-motion: reduce){.map-pulse{animation:none}}'}</style>
    <div style={{...window.container,display:'grid',gridTemplateColumns:'.95fr 1.05fr',gap:56,alignItems:'center'}}>
      <div className="reveal" style={{display:'grid',gap:18,justifyItems:'start'}}>
        <span style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 14px',borderRadius:'var(--radius-full)',background:'var(--blue-50)',color:'var(--blue-700)',fontSize:'.75rem',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase'}}><window.Icon name="map" size={15}/>Bản đồ trực tuyến</span>
        <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',fontWeight:600,color:'var(--primary)',lineHeight:1.2}}>Bản đồ vị trí OOH toàn quốc</h2>
        <p style={{margin:0,fontSize:'var(--text-body-lg)',color:'var(--slate-600)',lineHeight:1.6,maxWidth:460}}>Lọc theo tỉnh/thành, loại biển, ngân sách. Xem điểm AI và chọn vị trí để nhận báo giá trong vài phút.</p>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {[['~730','Vị trí OOH'],['30+','Tỉnh/thành']].map(([v,l])=><div key={l} style={{display:'flex',alignItems:'baseline',gap:6,padding:'8px 16px',borderRadius:'var(--radius-full)',border:'1px solid var(--border)',background:'var(--slate-50)'}}><strong style={{fontFamily:'var(--font-mono)',fontSize:'1.125rem',color:'var(--primary)'}}>{v}</strong><span style={{fontSize:'.75rem',fontWeight:600,color:'var(--muted-foreground)'}}>{l}</span></div>)}
        </div>
        <button className="map-cta" onClick={()=>{window.location.href='map.html'}} style={{display:'inline-flex',alignItems:'center',gap:8,height:52,padding:'0 24px',border:'none',borderRadius:'var(--radius-md)',background:'var(--cta)',color:'var(--cta-foreground)',fontWeight:600,fontSize:'1rem',fontFamily:'var(--font-sans)',cursor:'pointer',boxShadow:'var(--shadow-md)'}}>Khám phá bản đồ vị trí <window.Icon name="arrow-right" size={18}/></button>
      </div>
      <div className="reveal-scale" style={{position:'relative'}}>
        <div style={{position:'absolute',width:'70%',height:'70%',left:'15%',top:'15%',background:'var(--blue-200)',filter:'blur(70px)',opacity:.5,zIndex:0}}></div>
        <div className="tcg-card tcg-media" style={{position:'relative',zIndex:1,background:'linear-gradient(160deg,#fff,var(--blue-50))'}}>
          <img src="/v1-assets/assets/world-map-dotted.png" alt="Bản đồ mạng lưới vị trí OOH Toàn Cầu" style={{width:'100%',display:'block',mixBlendMode:'multiply'}}/>
        </div>
        <div className="map-pulse" style={{position:'absolute',left:24,top:24,zIndex:2,display:'flex',alignItems:'center',gap:8,padding:'8px 14px',borderRadius:'var(--radius-full)',background:'#fff',border:'1px solid var(--border)',boxShadow:'var(--shadow-md)'}}>
          <span style={{width:8,height:8,borderRadius:'50%',background:'var(--success)'}}></span>
          <span style={{fontSize:'.75rem',fontWeight:600,color:'var(--foreground)'}}>Đang khai thác trực tiếp</span>
        </div>
        <div style={{position:'absolute',right:20,bottom:20,zIndex:2,display:'flex',alignItems:'center',gap:8,padding:'10px 16px',borderRadius:'var(--radius-lg)',background:'var(--blue-900)',color:'#fff',boxShadow:'var(--shadow-lg)'}}>
          <window.Icon name="sparkles" size={16} color="var(--blue-200)"/>
          <span style={{fontSize:'.8125rem',fontWeight:600}}>Điểm AI theo ngành hàng</span>
        </div>
      </div>
    </div></section>;
}
function MapSection({onAdd,hideHead}){
  const locs=D2.locations;
  const mapEl=React.useRef(null);
  const mapRef=React.useRef(null);
  const onAddRef=React.useRef(onAdd);
  onAddRef.current=onAdd;
  const [sel,setSel]=React.useState(null);
  const [ready,setReady]=React.useState(false);
  const [baseMap,setBaseMap]=React.useState('satellite');
  const [listOpen,setListOpen]=React.useState(true);
  const toggleList=(v)=>{setListOpen(v);setTimeout(()=>{mapRef.current&&mapRef.current.resize()},30)};
  const switchBase=(mode)=>{
    setBaseMap(mode);
    const map=mapRef.current;
    if(!map)return;
    map.setLayoutProperty('esri','visibility',mode==='satellite'?'visible':'none');
    map.setLayoutProperty('osm','visibility',mode==='street'?'visible':'none');
  };
  const openPopup=(map,l)=>{
    const el=document.createElement('div');
    el.style.cssText='font-family:var(--font-sans);display:grid;gap:8px;width:230px';
    el.innerHTML='<img src="'+l.img+'" alt="" style="width:100%;height:110px;object-fit:cover;border-radius:2px"/>' +
      '<strong style="font-size:14px;line-height:1.35">'+l.name+'</strong>' +
      '<span style="font-family:var(--font-mono);font-size:13px;color:var(--primary);font-weight:600">'+D2.fmt(l.priceN)+'</span>';
    const pill=statusPillStyle(l.status);
    const row=document.createElement('div');
    row.style.cssText='display:flex;gap:8px;align-items:center';
    row.innerHTML='<span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;background:'+pill.bg+';color:'+(l.status==='available'?'#0F766E':l.status==='soon'?'#92400E':'#9D174D')+'">'+pill.label+'</span>';
    if(l.status!=='booked'){
      const btn=document.createElement('button');
      btn.textContent='+ Thêm báo giá';
      btn.style.cssText='flex:1;height:32px;border:none;border-radius:2px;background:var(--cta);color:#fff;font-weight:600;font-size:12.5px;font-family:var(--font-sans);cursor:pointer';
      btn.onclick=()=>onAddRef.current&&onAddRef.current(l);
      row.appendChild(btn);
    }
    el.appendChild(row);
    new window.maplibregl.Popup({offset:14,maxWidth:'260px',closeOnClick:false}).setLngLat([l.lng,l.lat]).setDOMContent(el).addTo(map);
  };
  const openClusterPopup=(map,lng,lat,count)=>{
    const near=[...locs].sort((p,q)=>((p.lng-lng)**2+(p.lat-lat)**2)-((q.lng-lng)**2+(q.lat-lat)**2)).slice(0,3);
    const el=document.createElement('div');
    el.style.cssText='font-family:var(--font-sans);display:grid;gap:0;width:min(300px,84vw)';
    el.innerHTML='<div style="font-weight:600;font-size:13.5px;padding:2px 0 8px">'+count+' vị trí trong khu vực</div>';
    near.forEach(l=>{
      const p=statusPillStyle(l.status);
      const row=document.createElement('div');
      row.style.cssText='display:flex;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--border)';
      row.innerHTML='<img src="'+l.img+'" alt="" style="width:52px;height:38px;object-fit:cover;border-radius:2px;flex:none"/>' +
        '<div style="display:grid;gap:2;min-width:0;flex:1">' +
          '<strong style="font-size:12.5px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+l.name+'</strong>' +
          '<span style="font-size:11px;color:var(--muted-foreground)">'+l.type+' · <span style="font-family:var(--font-mono)">'+l.size+'</span> · <span style="font-family:var(--font-mono);color:var(--primary);font-weight:600">'+D2.fmt(l.priceN)+'</span></span>' +
        '</div>' +
        '<span style="flex:none;font-size:10px;font-weight:600;padding:2px 7px;border-radius:999px;background:'+p.bg+';color:'+(l.status==='available'?'#0F766E':l.status==='soon'?'#92400E':'#9D174D')+'">'+p.label+'</span>';
      const btn=document.createElement('button');
      btn.textContent='Xem chi tiết vị trí';
      btn.style.cssText='display:none';
      row.style.cursor='pointer';
      row.onclick=()=>openPopup(map,l);
      el.appendChild(row);
    });
    const note=document.createElement('div');
    note.style.cssText='font-size:11px;color:var(--muted-foreground);padding-top:8px;border-top:1px solid var(--border)';
    note.textContent='Dữ liệu mẫu. Bấm từng dòng để xem chi tiết, hoặc liên hệ để nhận danh sách đầy đủ.';
    el.appendChild(note);
    new window.maplibregl.Popup({offset:16,maxWidth:'none',closeOnClick:false}).setLngLat([lng,lat]).setDOMContent(el).addTo(map);
  };
  React.useEffect(()=>{
    if(!window.maplibregl||!mapEl.current)return;
    const map=new window.maplibregl.Map({
      container:mapEl.current,
      style:{version:8,sources:{esri:{type:'raster',tiles:[ESRI_TILES],tileSize:256,attribution:'Tiles © Esri | Esri, Maxar, Earthstar Geographics, and the GIS User Community'},osm:{type:'raster',tiles:[OSM_TILES],tileSize:512,attribution:'© OpenStreetMap contributors © CARTO'}},layers:[{id:'esri',type:'raster',source:'esri'},{id:'osm',type:'raster',source:'osm',layout:{visibility:'none'}}]},
      center:[105.845,21.02],zoom:10.4,attributionControl:{compact:false}});
    mapRef.current=map;
    map.addControl(new window.maplibregl.NavigationControl({showCompass:false}),'bottom-right');
    map.addControl(new window.maplibregl.ScaleControl({maxWidth:110}),'bottom-left');
    D2.clusters.forEach(([lng,lat,count])=>{
      const el=document.createElement('div');
      const big=count>=25;
      el.style.cssText='width:'+(big?38:30)+'px;height:'+(big?38:30)+'px;border-radius:50%;display:grid;place-items:center;font:600 '+(big?14:12.5)+'px var(--font-mono);color:#053B34;background:'+(big?'#F5A524':'#2DD4BF')+';border:2.5px solid rgba(255,255,255,.92);box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer';
      if(big)el.style.color='#4A2A00';
      el.textContent=count;
      el.title=count+' vị trí trong khu vực';
      el.onclick=e=>{e.stopPropagation();map.flyTo({center:[lng,lat],zoom:12.5,essential:true});openClusterPopup(map,lng,lat,count)};
      new window.maplibregl.Marker({element:el}).setLngLat([lng,lat]).addTo(map);
    });
    locs.forEach((l,i)=>{
      const el=document.createElement('div');
      el.style.cssText='width:34px;height:38px;display:grid;place-items:center;cursor:pointer;filter:drop-shadow(0 2px 5px rgba(0,0,0,.45))';
      el.innerHTML='<svg width="34" height="38" viewBox="0 0 34 38"><rect x="3" y="3" width="28" height="17" rx="1.5" fill="var(--blue-500)" stroke="#fff" stroke-width="2"/><rect x="15.5" y="20" width="3" height="12" fill="#fff"/><rect x="10" y="32" width="14" height="3" rx="1.5" fill="#fff"/><path d="M9 9.5h10M9 13.5h7" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
      el.title=l.name;
      el.onclick=e=>{e.stopPropagation();setSel(i);map.flyTo({center:[l.lng,l.lat],zoom:12.8,essential:true});openPopup(map,l)};
      new window.maplibregl.Marker({element:el}).setLngLat([l.lng,l.lat]).addTo(map);
    });
    setReady(true);
    return ()=>{map.remove();mapRef.current=null};
  },[]);
  const focus=(i)=>{
    setSel(i);
    const map=mapRef.current,l=locs[i];
    if(map){map.flyTo({center:[l.lng,l.lat],zoom:l.city==='Hà Nội'?12.8:11.5,essential:true});openPopup(map,l)}
  };
  const legendDot=(c,label)=><span style={{display:'inline-flex',alignItems:'center',gap:6,fontSize:'.75rem',color:'#E2E8F0'}}><span style={{width:9,height:9,borderRadius:'50%',background:c}}></span>{label}</span>;
  return <section id="map" style={{background:'var(--muted)',padding:hideHead?'0':'88px 0 0'}}>
    {!hideHead&&<div style={{...window.container,paddingBottom:40}}>
      <window.SectionHead title="Bản đồ vị trí OOH toàn quốc" sub="Lọc theo tỉnh/thành, loại biển, ngân sách, chọn vị trí để nhận báo giá."/>
    </div>}
    <div style={{display:'grid',gridTemplateColumns:listOpen?'320px 1fr':'1fr',height:hideHead?'calc(100vh - 72px)':600,minHeight:520}}>
      {listOpen&&<aside style={{background:'var(--slate-900)',color:'#F1F5F9',display:'grid',gridTemplateRows:'auto 1fr',minHeight:0}}>
        <div style={{padding:'12px 12px 12px 16px',borderBottom:'1px solid rgba(255,255,255,.1)',fontSize:'.8125rem',color:'var(--slate-400)',display:'flex',alignItems:'center',gap:10}}>
          <span style={{flex:1}}>Hiển thị <strong style={{fontFamily:'var(--font-mono)',color:'#fff'}}>{locs.length}/2.008</strong> kết quả. Thu hẹp bộ lọc để chính xác hơn.</span>
          <button onClick={()=>toggleList(false)} aria-label="Đóng danh sách" title="Đóng danh sách" style={{flex:'none',width:34,height:34,border:'none',borderRadius:'var(--radius-full)',background:'var(--blue-500)',color:'#fff',fontSize:'1.05rem',fontWeight:700,cursor:'pointer',display:'grid',placeItems:'center',boxShadow:'0 2px 8px rgba(0,0,0,.35)'}}>✕</button>
        </div>
        <div style={{overflowY:'auto',minHeight:0}}>
          {locs.map((l,i)=><div key={l.id} onClick={()=>focus(i)} style={{display:'flex',gap:12,padding:'14px 16px',cursor:'pointer',borderBottom:'1px solid rgba(255,255,255,.07)',background:sel===i?'rgba(54,143,255,.14)':'transparent',borderLeft:sel===i?'3px solid var(--blue-400)':'3px solid transparent'}}>
            <img src={l.img} alt="" style={{width:56,height:42,objectFit:'cover',borderRadius:2,flex:'none'}}/>
            <div style={{display:'grid',gap:4,alignContent:'start',minWidth:0,flex:1}}>
              <strong style={{fontSize:'.875rem',lineHeight:1.3}}>★ {l.name}</strong>
              <span style={{fontSize:'.75rem',color:'var(--slate-400)'}}>{l.type} · <span style={{fontFamily:'var(--font-mono)'}}>{l.size}</span></span>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                {(()=>{const p=statusPillStyle(l.status);return <span style={{fontFamily:'var(--font-mono)',fontSize:'.6875rem',fontWeight:600,padding:'2px 9px',borderRadius:'var(--radius-full)',background:p.bg,color:p.fg}}>{p.label}</span>})()}
                {l.status!=='booked'&&<button onClick={e=>{e.stopPropagation();onAdd&&onAdd(l)}} style={{marginLeft:'auto',height:26,padding:'0 10px',border:'1px solid rgba(255,255,255,.25)',borderRadius:2,background:'transparent',color:'#BFDBFE',fontSize:'.6875rem',fontWeight:600,fontFamily:'var(--font-sans)',cursor:'pointer'}}>+ Báo giá</button>}
              </div>
            </div>
          </div>)}
        </div>
      </aside>}
      <div style={{position:'relative',minHeight:0}}>
        <div ref={mapEl} style={{position:'absolute',inset:0}}></div>
        {!window.maplibregl&&<div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',background:'var(--slate-100)',color:'var(--muted-foreground)',fontSize:'.875rem'}}>Không tải được MapLibre GL. Kiểm tra kết nối rồi tải lại trang.</div>}
        <div style={{position:'absolute',top:12,right:12,zIndex:5,display:'flex',borderRadius:4,overflow:'hidden',boxShadow:'var(--shadow-lg)',border:'1px solid rgba(255,255,255,.25)'}}>
          {[['satellite','Vệ tinh'],['street','Bản đồ']].map(([m,l])=><button key={m} onClick={()=>switchBase(m)} style={{height:36,padding:'0 16px',border:'none',cursor:'pointer',fontFamily:'var(--font-sans)',fontSize:'.8125rem',fontWeight:600,background:baseMap===m?'var(--primary)':'rgba(15,23,42,.85)',color:baseMap===m?'#fff':'#CBD5E1'}}>{l}</button>)}
        </div>
        {!listOpen&&<button onClick={()=>toggleList(true)} style={{position:'absolute',top:12,left:12,zIndex:6,height:38,padding:'0 16px',border:'none',borderRadius:'var(--radius-full)',background:'var(--blue-500)',color:'#fff',fontSize:'.8125rem',fontWeight:600,fontFamily:'var(--font-sans)',cursor:'pointer',boxShadow:'var(--shadow-lg)',display:'inline-flex',alignItems:'center',gap:8}}><span style={{fontSize:'1rem'}}>☰</span> Danh sách ({locs.length})</button>}
        <div style={{position:'absolute',top:listOpen?12:60,left:12,zIndex:5,background:'rgba(15,23,42,.88)',borderRadius:4,padding:'10px 14px',display:'grid',gap:8,boxShadow:'var(--shadow-lg)'}}>
          <div style={{display:'flex',gap:14}}>{legendDot('#2DD4BF','Còn trống')}{legendDot('#F472B6','Đã cho thuê')}</div>
          <div style={{display:'flex',gap:14}}>{legendDot('#2DD4BF','Cụm vị trí')}{legendDot('#F5A524','Cụm lớn ≥25')}{legendDot('var(--blue-500)','★ Vị trí tiêu biểu')}</div>
        </div>
      </div>
    </div>
  </section>;
}
const JOURNEY=[
  {year:'2003',icon:'building-2',title:'Thành lập doanh nghiệp',desc:'Bắt đầu từ tổ chức sự kiện, hội chợ triển lãm, tư vấn quy hoạch quảng cáo, thiết kế và in ấn.'},
  {year:'2005',icon:'trending-up',title:'Mở rộng biển quảng cáo ngoài trời',desc:'Phát triển mạnh sang biển quảng cáo tấm lớn ngoài trời trên toàn quốc.'},
  {year:'2010s',icon:'plane',title:'Mở rộng sân bay và LED',desc:'Đầu tư hệ thống LED, quảng cáo tại sân bay, nhà chờ, billboard và pano.'},
  {year:'2020s',icon:'map',title:'Mạng lưới toàn quốc',desc:'Vận hành ~730 vị trí, 89.000 m² diện tích khai thác, phục vụ 400+ nhãn hàng.'},
  {year:'2026',icon:'sparkles',title:'Chuyển đổi số',desc:'Ra mắt bản đồ vị trí và điểm AI, số hóa dữ liệu và tự động hoá báo giá.'}
];
function Journey(){
  return <section style={{padding:'88px 0',background:'#fff'}}>
    <div style={window.container}>
      <h2 className="reveal" style={{margin:'0 0 56px',textAlign:'center',fontFamily:'var(--font-display)',fontSize:'clamp(1.75rem,3vw,2.5rem)',fontWeight:700,letterSpacing:'.01em',color:'var(--primary)'}}>Hành trình 20 năm</h2>
      <div style={{position:'relative',display:'grid',gridTemplateColumns:`repeat(${JOURNEY.length},1fr)`,gap:16}}>
        <div className="tcg-timeline-line" style={{position:'absolute',left:'10%',right:'10%',top:74,height:3,borderRadius:2,background:'linear-gradient(90deg,var(--blue-300),var(--blue-600))',zIndex:0}}></div>
        {JOURNEY.map((j,i)=><div key={j.year} className="reveal" style={{'--reveal-delay':(i*0.12)+'s',position:'relative',zIndex:1,display:'grid',gap:14,justifyItems:'center',textAlign:'center'}}>
          <span style={{fontFamily:'var(--font-mono)',fontWeight:700,fontSize:'.9375rem',color:'var(--foreground)'}}>{j.year}</span>
          <span className="tcg-jicon" style={{width:56,height:56,borderRadius:'50%',background:'var(--blue-100)',color:'var(--primary)',display:'grid',placeItems:'center',border:'3px solid #fff',boxShadow:'0 0 0 2px var(--border)',transition:'transform .4s var(--ease-spring),background .3s,color .3s,box-shadow .3s'}}><window.Icon name={j.icon} size={24}/></span>
          <span style={{width:10,height:10,borderRadius:'50%',background:'var(--primary)',marginTop:-4}}></span>
          <div style={{display:'grid',gap:6,marginTop:4}}>
            <strong style={{fontSize:'.9375rem',fontWeight:700,lineHeight:1.35}}>{i+1}. {j.title}</strong>
            <p style={{margin:0,fontSize:'.8125rem',color:'var(--slate-600)',lineHeight:1.55}}>{j.desc}</p>
          </div>
        </div>)}
      </div>
    </div>
  </section>;
}
function Services(){
  return <section id="services" style={{background:'var(--muted)',padding:'88px 0'}}>
    <div style={window.container}>
      <window.SectionHead title="Giải pháp OOH của Toàn Cầu"/>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
        {D2.services.map((s,i)=><div key={s.name} className="tcg-card reveal" style={{'--reveal-delay':(i*0.07)+'s',display:'grid',gap:12,alignContent:'start',padding:'24px 22px'}}>
          <span className="tcg-icon" style={{width:46,height:46,borderRadius:'var(--radius-md)',background:'var(--navy-50)',display:'grid',placeItems:'center',color:'var(--primary)'}}><window.Icon name={s.icon} size={22}/></span>
          <strong style={{fontSize:'var(--text-h4)',fontWeight:600,fontFamily:'var(--font-display)'}}>{s.name}</strong>
          <p style={{margin:0,fontSize:'.875rem',color:'var(--muted-foreground)',lineHeight:1.6}}>{s.desc}</p>
          <a className="tcg-arrow" style={{fontSize:'.875rem',fontWeight:600,color:'var(--primary)',cursor:'pointer'}}>Tìm hiểu <window.Icon name="arrow-right" size={16}/></a>
        </div>)}
      </div></div></section>;
}
function Cases(){
  const D=window.TCG_DATA;
  return <section id="cases" style={{padding:'88px 0'}}>
    <div style={window.container}>
      <div className="reveal" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:28,flexWrap:'wrap',gap:16}}>
        <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',fontWeight:600,color:'var(--primary)'}}>Dự án & chiến dịch tiêu biểu</h2>
        <Button variant="primary" onClick={()=>{window.location.href='news.html'}}>Xem tất cả →</Button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
        {D.news.slice(0,4).map((n,i)=><article key={n.title} className="tcg-card reveal" onClick={()=>{window.location.href='news.html'}} style={{'--reveal-delay':(i*0.08)+'s',display:'grid',gridTemplateRows:'auto 1fr',gap:0,cursor:'pointer'}}>
          <div className="tcg-media" style={{aspectRatio:'16/10'}}>
            <img src={n.img} alt=""/>
            <span style={{position:'absolute',left:12,top:12,zIndex:1,fontSize:'.6875rem',fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',color:'#fff',background:'rgba(35,116,217,.92)',padding:'4px 10px',borderRadius:'var(--radius-full)',boxShadow:'var(--shadow-sm)'}}>{n.tag}</span>
          </div>
          <div style={{padding:'16px 18px 20px',display:'grid',gap:10,alignContent:'start'}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'.75rem',color:'var(--muted-foreground)'}}>{n.date}</span>
            <h3 style={{margin:0,fontSize:'1rem',fontWeight:600,lineHeight:1.45,fontFamily:'var(--font-display)'}}>{n.title}</h3>
            <span className="tcg-arrow" style={{marginTop:4,fontSize:'.8125rem',fontWeight:600,color:'var(--primary)'}}>Đọc tiếp <window.Icon name="arrow-right" size={15}/></span>
          </div>
        </article>)}
      </div></div></section>;
}
function LeadForm({onToast}){
  const [st,setSt]=React.useState('idle');
  const [ok,setOk]=React.useState(false);
  const submit=()=>{setSt('submitting');setTimeout(()=>{setSt('success');onToast({kind:'success',title:'Đã gửi yêu cầu tư vấn',message:'Đội ngũ Toàn Cầu sẽ liên hệ trong 24h.'})},1200)};
  return <section id="lead" data-anchor="lien-he" style={{background:'var(--navy-50)',padding:'88px 0'}}>
    <span id="lien-he" style={{position:'relative',top:-90,display:'block'}}></span>
    <div style={{...window.container,display:'grid',gridTemplateColumns:'.9fr 1.1fr',gap:48,alignItems:'start'}}>
      <div className="reveal" style={{display:'grid',gap:16}}>
        <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',fontWeight:600,color:'var(--primary)',lineHeight:1.18}}>Nhận tư vấn OOH miễn phí</h2>
        <p style={{margin:0,fontSize:'var(--text-body-lg)',color:'var(--slate-600)'}}>Để lại thông tin, đội ngũ Toàn Cầu liên hệ trong 24h.</p>
        <ul className="reveal-group" style={{margin:0,padding:0,listStyle:'none',display:'grid',gap:10}}>
          {['Tư vấn vị trí theo ngành hàng, có điểm AI gợi ý','Báo giá PDF nháp trong vài phút, 24/7','Khảo sát và thi công trọn gói toàn quốc','20 năm kinh nghiệm, 400+ nhãn hàng đã hợp tác'].map(x=><li key={x} style={{display:'flex',gap:10,alignItems:'center',fontWeight:500}}><span style={{color:'var(--success)',fontWeight:700}}>✓</span>{x}</li>)}
        </ul>
        <div style={{display:'flex',gap:28,padding:'14px 0',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
          {[[20,'','+','Năm OOH'],[730,'~','','Vị trí'],[30,'','+','Tỉnh/thành']].map(([n,p,s,l])=><div key={l} style={{display:'grid',gap:2}}><strong data-countup={n} data-prefix={p} data-suffix={s} style={{fontFamily:'var(--font-mono)',fontSize:'1.5rem',color:'var(--primary)'}}>{p+n+s}</strong><span style={{fontSize:'.75rem',fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',color:'var(--muted-foreground)'}}>{l}</span></div>)}
        </div>
        <div style={{display:'grid',gap:8}}>
          <span style={{fontSize:'.875rem',color:'var(--slate-600)'}}>Cần tư vấn ngay? Gọi trực tiếp:</span>
          <a href="tel:02439290088" style={{fontFamily:'var(--font-mono)',fontSize:'1.375rem',fontWeight:700,color:'var(--primary)',textDecoration:'none'}}>024 3929 0088</a>
        </div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          <Button variant="primary" onClick={()=>{window.location.href='map.html'}}>Khám phá bản đồ vị trí</Button>
          <Button variant="outline" onClick={()=>{window.location.href='services.html'}}>Xem các dịch vụ</Button>
        </div></div>
      {st==='success'?
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:40,display:'grid',gap:10,justifyItems:'center',textAlign:'center',boxShadow:'var(--shadow-md)'}}>
          <span style={{width:56,height:56,borderRadius:'50%',background:'var(--success)',color:'#fff',display:'grid',placeItems:'center',fontSize:26,fontWeight:700}}>✓</span>
          <strong style={{fontSize:'var(--text-h3)'}}>Đã nhận yêu cầu của bạn</strong>
          <p style={{margin:0,color:'var(--muted-foreground)'}}>Chúng tôi sẽ liên hệ trong 24h làm việc. Mã yêu cầu: <span style={{fontFamily:'var(--font-mono)',fontWeight:600}}>TC-2607-018</span></p>
          <Button variant="outline" onClick={()=>setSt('idle')}>Gửi yêu cầu khác</Button>
        </div>
      : <div className="reveal-scale" style={{background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-xl)',padding:28,display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,boxShadow:'var(--shadow-card)'}}>
        <Field label="Họ tên" required><Input placeholder="Nguyễn Văn A"/></Field>
        <Field label="Số điện thoại" required><Input placeholder="09xx xxx xxx"/></Field>
        <Field label="Doanh nghiệp"><Input placeholder="Tên công ty"/></Field>
        <Field label="Email"><Input placeholder="ban@congty.vn"/></Field>
        <Field label="Ngành hàng"><Input placeholder="Ví dụ: F&B, Thời trang, Mỹ phẩm…"/></Field>
        <Field label="Ngân sách"><Input placeholder="Ví dụ: 50-150 triệu/tháng"/></Field>
        <div style={{gridColumn:'1/-1'}}><Field label="Nhu cầu / ghi chú"><Textarea rows={3} placeholder="Mô tả ngắn nhu cầu quảng cáo…"/></Field></div>
        <Checkbox label="Đồng ý nhận liên hệ" checked={ok} onChange={setOk}/>
        <div style={{justifySelf:'end'}}><Button variant="cta" loading={st==='submitting'} disabled={!ok} onClick={submit}>{st==='submitting'?'Đang gửi…':'Gửi yêu cầu tư vấn'}</Button></div>
      </div>}
    </div></section>;
}
function CTABand(){
  return <section className="tcg-ctaband" style={{position:'relative',zIndex:2,padding:'48px 0 0'}}>
    <style>{`
      .tcg-cta-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
      @media(max-width:960px){.tcg-cta-grid{grid-template-columns:1fr;gap:36px}}
      .tcg-cta-btn{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.tcg-cta-btn:hover{transform:translateY(-2px)}.tcg-cta-btn:active{transform:translateY(0) scale(.98)}
      .tcg-cta-img{animation:tcgctafloat 6s ease-in-out infinite}
      @keyframes tcgctafloat{50%{transform:translateY(-8px)}}
      @media(prefers-reduced-motion:reduce){.tcg-cta-img{animation:none}}
      .tcg-ctaband+footer{padding-top:168px!important}
    `}</style>
    <div style={{...window.container,marginBottom:-84}}>
      <div className="reveal tcg-cta-grid" style={{borderRadius:28,background:'linear-gradient(120deg,var(--blue-100) 0%,var(--blue-50) 100%)',padding:'clamp(36px,5vw,72px)',boxShadow:'var(--shadow-lg)'}}>
        <div style={{display:'grid',gap:20,justifyItems:'start'}}>
          <h2 style={{margin:0,color:'var(--blue-900)',fontFamily:'var(--font-display)',fontSize:'clamp(1.75rem,2.6vw,2.5rem)',fontWeight:700,lineHeight:1.18,letterSpacing:'-0.01em',textWrap:'balance'}}>Sẵn sàng tìm vị trí OOH cho chiến dịch tiếp theo?</h2>
          <p style={{margin:0,fontSize:'var(--text-body-lg)',lineHeight:1.65,color:'var(--slate-600)',maxWidth:480}}>
            Dù bạn là nhãn hàng, agency hay chủ mặt bằng,<br/>
            Toàn Cầu ADV có dữ liệu và đội ngũ để chiến dịch của bạn thành công.
          </p>
          <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center',marginTop:8}}>
            <button className="tcg-cta-btn" onClick={()=>window.goContact()} style={{display:'inline-flex',alignItems:'center',gap:10,height:54,padding:'0 28px',border:'none',borderRadius:'var(--radius-md)',background:'var(--blue-900)',color:'#fff',fontWeight:600,fontSize:'1.0625rem',fontFamily:'var(--font-sans)',cursor:'pointer',boxShadow:'var(--shadow-md)'}}>Yêu cầu báo giá <window.Icon name="arrow-right" size={19}/></button>
            <button className="tcg-cta-btn" onClick={()=>{window.location.href='map.html'}} style={{display:'inline-flex',alignItems:'center',gap:8,height:54,padding:'0 22px',border:'1.5px solid var(--blue-300)',borderRadius:'var(--radius-md)',background:'transparent',color:'var(--blue-900)',fontWeight:600,fontSize:'1.0625rem',fontFamily:'var(--font-sans)',cursor:'pointer'}}><window.Icon name="map" size={18}/> Khám phá bản đồ vị trí</button>
          </div>
          <span style={{fontSize:'.8125rem',color:'var(--slate-500)'}}>Bạn là chủ biển muốn cho thuê? Sàn OOH sắp ra mắt.</span>
        </div>
        <div className="tcg-cta-img" style={{position:'relative'}}>
          <div data-parallax="0.05" style={{position:'relative',borderRadius:18,overflow:'hidden',boxShadow:'var(--shadow-lg)',aspectRatio:'16/10',background:'var(--blue-200)'}}>
            <img src="/v1-assets/assets/ooh/quangninh-hl30-cta.jpg" alt="Billboard Toàn Cầu ADV trên cầu Bãi Cháy, Hạ Long — vòng quay Mặt Trời phía xa" loading="lazy" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
            <div aria-hidden style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 60%,rgba(13,47,94,.3))'}}></div>
          </div>
          <div style={{position:'absolute',bottom:-16,left:-14,display:'flex',alignItems:'center',gap:9,padding:'10px 15px',borderRadius:'var(--radius-md)',background:'#fff',boxShadow:'var(--shadow-lg)',border:'1px solid var(--slate-200)'}}>
            <span style={{display:'grid',placeItems:'center',width:32,height:32,borderRadius:9,background:'var(--blue-50)',color:'var(--blue-600)'}}><window.Icon name="ferris-wheel" size={17}/></span>
            <span style={{display:'grid',lineHeight:1.25}}>
              <strong style={{fontSize:'.875rem',color:'var(--blue-900)'}}>Cầu Bãi Cháy — Hạ Long</strong>
              <span style={{fontSize:'.71875rem',color:'var(--slate-500)'}}>Thương hiệu của bạn trên hành trình mỗi ngày</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
const socialCircle={width:36,height:36,borderRadius:'var(--radius-full)',border:'1px solid var(--border)',display:'grid',placeItems:'center',color:'var(--primary)',cursor:'pointer'};
function Footer(){
  const info=(label,val)=><p style={{margin:0,fontSize:'.9375rem',lineHeight:1.7,color:'var(--slate-700)'}}><strong style={{color:'var(--foreground)'}}>{label}:</strong> {val}</p>;
  const col=(t,items)=><div style={{display:'grid',gap:12,alignContent:'start'}}>
    <strong style={{fontSize:'1rem',color:'var(--foreground)'}}>{t}</strong>
    {items.map((x,i)=>typeof x==='string'
      ?<a key={i} style={{color:'var(--slate-600)',fontSize:'.9375rem',cursor:'pointer',textDecoration:'none'}}>{x}</a>
      :Array.isArray(x)&&typeof x[1]==='string'&&x[1].startsWith('.')
      ?<a key={i} href={x[1]} style={{color:'var(--slate-600)',fontSize:'.9375rem',textDecoration:'none'}}>{x[0]}</a>
      :<div key={i} style={{display:'grid',gap:2}}><span style={{color:'var(--slate-600)',fontSize:'.9375rem'}}>{x[0]}</span><strong style={{fontFamily:'var(--font-mono)',fontSize:'1.0625rem',color:'var(--foreground)'}}>{x[1]}</strong></div>)}
  </div>;
  return <footer style={{background:'#fff',borderTop:'1px solid var(--border)',padding:'56px 0 24px'}}>
    <div style={{...window.container,display:'grid',gap:36}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.1fr',gap:48,alignItems:'start'}}>
        <div style={{display:'grid',gap:12,justifyItems:'start'}}>
          <img src="/v1-assets/assets/logo-full.png" alt="Toàn Cầu ADV" style={{height:52}}/>
          <strong style={{fontSize:'1.0625rem'}}>Công Ty Cổ Phần Tập Đoàn Quảng Cáo Toàn Cầu</strong>
          {info('Trụ sở chính','265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội, Việt Nam')}
          {info('Hotline','024 3929 0088')}
          {info('Email','info@toancauadv.vn')}
          {info('Thời gian làm việc','Giờ hành chính từ thứ 2 đến sáng thứ 7')}
          <span style={{fontSize:'.9375rem',color:'var(--slate-700)',marginTop:6}}>Theo dõi chúng tôi qua:</span>
          <div style={{display:'flex',gap:12}}>
            <span style={socialCircle} aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></span>
            <span style={socialCircle} aria-label="YouTube"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></span>
            <span style={socialCircle} aria-label="Zalo / điện thoại"><window.Icon name="phone" size={16}/></span>
          </div>
        </div>
        <div style={{position:'relative',minHeight:280,borderRadius:'var(--radius-xl)',overflow:'hidden',border:'1px solid var(--border)',background:'linear-gradient(150deg,#E8F0FA,#DCE8F5 55%,#D2E1F0)'}}>
          <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(35,116,217,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(35,116,217,.07) 1px,transparent 1px)',backgroundSize:'40px 40px'}}></div>
          <div style={{position:'absolute',left:'52%',top:'44%',transform:'translate(-50%,-100%)'}}><NS2.MapMarker state="selected"/></div>
          <div style={{position:'absolute',left:12,top:12,background:'#fff',border:'1px solid var(--border)',borderRadius:'var(--radius-md)',boxShadow:'var(--shadow-md)',padding:'10px 14px',display:'grid',gap:2}}>
            <strong style={{fontSize:'.875rem'}}>265 Thụy Khuê, Tây Hồ</strong>
            <span style={{fontSize:'.75rem',color:'var(--muted-foreground)'}}>Trụ sở Toàn Cầu ADV, Hà Nội</span>
          </div>
          <span style={{position:'absolute',right:10,bottom:8,fontSize:'.6875rem',color:'var(--slate-500)'}}>Bản đồ minh hoạ. Production: nhúng Google Maps.</span>
        </div>
      </div>
      <div className="reveal-group" style={{borderTop:'1px solid var(--border)',paddingTop:32,display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:32}}>
        {col('Doanh nghiệp',[['Về Toàn Cầu','./about.html'],'Khách hàng','Tin tức','Tuyển dụng','Liên hệ'])}
        {col('Dịch vụ',['Quảng cáo sân bay','Billboard · Pano','Màn hình LED','Nhà chờ xe bus'])}
        {col('Vị trí OOH',['Bản đồ vị trí','Theo tỉnh/thành','Vị trí còn trống'])}
        {col('Hotline',[['Tư vấn quảng cáo','024 3929 0088'],['Chăm sóc khách hàng','1900 6522']])}
      </div>
      <div style={{borderTop:'1px solid var(--border)',paddingTop:18,display:'flex',gap:16,fontSize:'.8125rem',color:'var(--muted-foreground)',flexWrap:'wrap'}}>
        <span>© 2026 Công ty Cổ phần Tập đoàn Quảng cáo Toàn Cầu</span><span style={{flex:1}}></span><span>Chính sách bảo mật</span><span>Điều khoản</span>
      </div></div></footer>;
}
Object.assign(window,{MapSection,MapPreview,Journey,Services,Cases,LeadForm,CTABand,Footer});
