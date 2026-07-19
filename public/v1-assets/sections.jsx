const NS=window.ToNCUADVDesignSystem_ce468e||{};
const {Button,TrustStats,FilterChip,FilterBar,LocationCard,CaseStudyCard,Select,Field,Input,Textarea,Checkbox,MapMarker,MapPopup,StatusPill,AIScoreBadge}=NS;
const D=window.TCG_DATA;
function Icon({name,size=20,color='currentColor',stroke=2}){
  const ref=React.useRef();
  React.useEffect(()=>{if(window.lucide&&ref.current){ref.current.innerHTML='';const el=document.createElement('i');el.setAttribute('data-lucide',name);ref.current.appendChild(el);window.lucide.createIcons({attrs:{width:size,height:size,'stroke-width':stroke,stroke:color}, nameAttr:'data-lucide', icons:window.lucide.icons});}},[name]);
  return <span ref={ref} style={{display:'inline-flex',width:size,height:size,color}}/>;
}
const container={maxWidth:'var(--container-max)',margin:'0 auto',padding:'0 32px'};
function Navbar({onQuote}){
  return <header className="tcg-nav" style={{position:'sticky',top:0,zIndex:40,background:'#fff',borderBottom:'1px solid var(--border)',boxShadow:'var(--shadow-sm)'}}>
    <div style={{...container,display:'flex',alignItems:'center',gap:28,height:72}}>
      <a href="index.html" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
        <img src="/v1-assets/assets/logo-full.png" alt="Toàn Cầu ADV" style={{height:40}}/>
        <span style={{display:'grid',lineHeight:1.15}}>
          <strong style={{color:'var(--primary)',fontSize:'1.125rem',fontFamily:'var(--font-display)',letterSpacing:'.01em'}}></strong>
          <span style={{fontSize:'.6875rem',color:'var(--muted-foreground)',letterSpacing:'.05em'}}></span>
        </span></a>
      <nav style={{display:'flex',gap:22,fontSize:'.9375rem',fontWeight:500,flex:1}}>
        {[['index.html','Trang chủ'],['about.html','Về chúng tôi'],['map.html','Bản đồ'],['services.html','Dịch vụ'],['news.html','Tin tức'],['index.html#lien-he','Liên hệ']].map(([h,l])=>
          <a key={h} href={h} style={{color:window.location.pathname.endsWith('/'+h)||(h==='index.html'&&/\/(index\.html)?$/.test(window.location.pathname))?'var(--primary)':'var(--slate-600)',fontWeight:window.location.pathname.endsWith('/'+h)?600:500,textDecoration:'none'}}>{l}</a>)}
      </nav>
      <Button variant="cta" size="sm" onClick={()=>goContact()}>Yêu cầu báo giá</Button>
    </div></header>;
}
const HERO_WORDS=[
  {word:'Billboard',img:'/v1-assets/assets/ooh/phapvan-51a.png'},
  {word:'Màn hình LED',img:'/v1-assets/assets/ooh/hanoi-cg01-nct.png'},
  {word:'Sân bay',img:'/v1-assets/assets/ooh/noibai-41b.jpg'},
  {word:'Nhà chờ xe bus',img:'/v1-assets/assets/ooh/quangninh-hl16.jpg'}
];
function useTypewriter(words,reduce){
  const [s,setS]=React.useState({w:0,len:reduce?words[0].length:0,del:false});
  React.useEffect(()=>{
    if(reduce)return;
    const word=words[s.w];
    let delay=s.del?42:88;
    if(!s.del&&s.len===word.length)delay=2100; // giữ nguyên chữ trước khi xóa
    if(s.del&&s.len===0)delay=420;             // nghỉ trước khi gõ từ mới
    const t=setTimeout(()=>setS(p=>{
      const wd=words[p.w];
      if(!p.del)return p.len<wd.length?{...p,len:p.len+1}:{...p,del:true};
      return p.len>0?{...p,len:p.len-1}:{w:(p.w+1)%words.length,len:0,del:false};
    }),delay);
    return ()=>clearTimeout(t);
  },[s,reduce]);
  return {text:words[s.w].slice(0,s.len),idx:s.w};
}
function Hero(){
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const {text,idx}=useTypewriter(HERO_WORDS.map(w=>w.word),reduce);
  return <section id="top" style={{position:'relative',overflow:'hidden',background:'linear-gradient(118deg,var(--blue-50) 0%,#FFFFFF 44%,var(--blue-100) 100%)'}}>
    <style>{`
      .hero-cta{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.hero-cta:hover{transform:translateY(-2px)}.hero-cta:active{transform:translateY(0) scale(.98)}
      .tcg-hero-grid{display:grid;grid-template-columns:1fr 1.18fr;gap:56px;align-items:center}
      @media(max-width:960px){.tcg-hero-grid{grid-template-columns:1fr;gap:44px}}
      .tcg-caret{display:inline-block;width:3px;height:.92em;margin-left:5px;border-radius:2px;background:var(--blue-600);vertical-align:-0.08em;animation:tcgblink 1s steps(1) infinite}
      @keyframes tcgblink{50%{opacity:0}}
      .tcg-hero-float{animation:tcgfloat 5.5s ease-in-out infinite}
      .tcg-hero-float2{animation:tcgfloat 6.5s ease-in-out -2.6s infinite}
      @keyframes tcgfloat{50%{transform:translateY(-10px)}}
      @media(prefers-reduced-motion:reduce){.tcg-caret,.tcg-hero-float,.tcg-hero-float2{animation:none}}
    `}</style>
    <div aria-hidden style={{position:'absolute',width:520,height:520,borderRadius:'50%',background:'radial-gradient(circle,rgba(54,143,255,.16),transparent 68%)',top:-160,right:-120,pointerEvents:'none'}}></div>
    <div aria-hidden style={{position:'absolute',width:420,height:420,borderRadius:'50%',background:'radial-gradient(circle,rgba(54,143,255,.12),transparent 70%)',bottom:-180,left:-140,pointerEvents:'none'}}></div>
    <div className="tcg-hero-grid" style={{position:'relative',zIndex:1,...container,paddingTop:88,paddingBottom:96}}>
      <div className="tcg-fadeup" style={{display:'grid',gap:26,justifyItems:'start'}}>
        <h1 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'clamp(2.5rem,4.3vw,3.9rem)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',color:'var(--blue-900)'}}>
          Giải pháp Quảng cáo<br/>
          <span style={{color:'var(--blue-600)'}}>{text}<span className="tcg-caret" aria-hidden></span></span><br/>
          Hàng đầu Việt Nam
        </h1>
        <p style={{margin:0,fontSize:'var(--text-body-lg)',lineHeight:1.65,color:'var(--slate-600)',maxWidth:520}}>
          Được hơn 400 nhãn hàng tin chọn trong suốt 20 năm;<br/>
          vận hành cùng dữ liệu vị trí minh bạch và điểm AI theo ngành hàng.
        </p>
        <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center',marginTop:4}}>
          <button className="hero-cta" onClick={()=>{window.location.href='map.html'}} style={{display:'inline-flex',alignItems:'center',gap:10,height:54,padding:'0 28px',border:'none',borderRadius:'var(--radius-md)',background:'var(--blue-900)',color:'#fff',fontWeight:600,fontSize:'1.0625rem',fontFamily:'var(--font-sans)',cursor:'pointer',boxShadow:'var(--shadow-md)'}}>Khám phá bản đồ vị trí <window.Icon name="arrow-right" size={19}/></button>
          <button className="hero-cta" onClick={()=>goContact()} style={{display:'inline-flex',alignItems:'center',gap:8,height:54,padding:'0 22px',border:'1.5px solid var(--slate-300)',borderRadius:'var(--radius-md)',background:'transparent',color:'var(--blue-900)',fontWeight:600,fontSize:'1.0625rem',fontFamily:'var(--font-sans)',cursor:'pointer'}}><window.Icon name="phone-call" size={18}/> Nhận tư vấn</button>
        </div>
        <div aria-hidden style={{width:'100%',maxWidth:460,borderTop:'2px dashed var(--slate-300)',marginTop:18}}></div>
        <div style={{display:'flex',gap:48,flexWrap:'wrap'}}>
          {[[730,'+','Vị trí quảng cáo toàn quốc'],[400,'+','Nhãn hàng đồng hành'],[20,'+','Năm kinh nghiệm']].map(([n,s,l])=>
            <div key={l} style={{display:'grid',gap:4}}>
              <strong data-countup={n} data-suffix={s} style={{fontFamily:'var(--font-display)',fontSize:'1.875rem',fontWeight:700,color:'var(--blue-900)',letterSpacing:'-0.01em'}}>{n+s}</strong>
              <span style={{fontSize:'.875rem',color:'var(--slate-500)'}}>{l}</span>
            </div>)}
        </div>
      </div>
      <div className="tcg-fadeup" style={{position:'relative',minHeight:340}}>
        <div data-parallax="0.06" style={{position:'relative',borderRadius:'var(--radius-xl,20px)',overflow:'hidden',boxShadow:'var(--shadow-lg)',aspectRatio:'4/3',background:'var(--blue-100)'}}>
          {HERO_WORDS.map((w,k)=><img key={w.img} src={w.img} alt={'Quảng cáo '+w.word+' — Toàn Cầu ADV'} loading={k===0?'eager':'lazy'} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:k===idx?1:0,transform:k===idx?'scale(1.04)':'scale(1)',transition:'opacity .9s ease,transform 6s ease-out'}}/>)}
          <div aria-hidden style={{position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 55%,rgba(13,47,94,.35))'}}></div>
        </div>
        <div className="tcg-hero-float" style={{position:'absolute',top:-18,left:-26,display:'flex',alignItems:'center',gap:10,padding:'12px 16px',borderRadius:'var(--radius-md)',background:'#fff',boxShadow:'var(--shadow-lg)',border:'1px solid var(--slate-200)'}}>
          <span style={{display:'grid',placeItems:'center',width:36,height:36,borderRadius:10,background:'var(--blue-50)',color:'var(--blue-600)'}}><window.Icon name="sparkles" size={18}/></span>
          <span style={{display:'grid',lineHeight:1.25}}>
            <strong style={{fontSize:'.9375rem',color:'var(--blue-900)'}}>Điểm AI 92/100</strong>
            <span style={{fontSize:'.75rem',color:'var(--slate-500)'}}>Gợi ý theo ngành hàng</span>
          </span>
        </div>
        <div className="tcg-hero-float2" style={{position:'absolute',bottom:-20,right:-14,display:'flex',alignItems:'center',gap:10,padding:'12px 16px',borderRadius:'var(--radius-md)',background:'#fff',boxShadow:'var(--shadow-lg)',border:'1px solid var(--slate-200)'}}>
          <span style={{display:'grid',placeItems:'center',width:36,height:36,borderRadius:10,background:'var(--blue-50)',color:'var(--blue-600)'}}><window.Icon name="map-pin" size={18}/></span>
          <span style={{display:'grid',lineHeight:1.25}}>
            <strong style={{fontSize:'.9375rem',color:'var(--blue-900)'}}>~730 vị trí</strong>
            <span style={{fontSize:'.75rem',color:'var(--slate-500)'}}>Phủ khắp 30+ tỉnh thành</span>
          </span>
        </div>
      </div>
    </div></section>;
}
function go(h){const el=document.querySelector(h);if(el){const y=el.getBoundingClientRect().top+window.scrollY-80;window.scrollTo({top:y,behavior:'smooth'})}}
function goContact(){if(document.getElementById('lien-he'))go('#lien-he');else window.location.href='index.html#lien-he'}
function Stats(){
  // Logo đối tác/thương hiệu (demo) – lấy từ logo.dev theo domain. Thay bằng logo thật khi có.
  const LOGO_TOKEN='pk_X-1ZO13GSgeOoUrIuJ6GMQ';
  const logo=(domain)=>`https://img.logo.dev/${domain}?token=${LOGO_TOKEN}&format=png&size=200&retina=true`;
  const partners=[
    {name:'Vinamilk',domain:'vinamilk.com.vn'},
    {name:'Viettel',domain:'viettel.com.vn'},
    {name:'Vietcombank',domain:'vietcombank.com.vn'},
    {name:'Vietnam Airlines',domain:'vietnamairlines.com'},
    {name:'VinFast',domain:'vinfastauto.com'},
    {name:'FPT',domain:'fpt.com'},
    {name:'Techcombank',domain:'techcombank.com.vn'},
    {name:'Highlands Coffee',domain:'highlandscoffee.com.vn'},
    {name:'MB Bank',domain:'mbbank.com.vn'},
    {name:'Thế Giới Di Động',domain:'thegioididong.com'},
    {name:'BIDV',domain:'bidv.com.vn'},
    {name:'Masan',domain:'masangroup.com'}
  ];
  const Row=({items,dur,delay})=><div className="tcg-marquee-row" style={{overflow:'hidden',width:'100%'}}>
    <div style={{display:'flex',gap:16,width:'max-content',animation:`tcgmarquee ${dur}s linear ${delay}s infinite`}}>
      {[...items,...items].map((p,i)=><div key={i} title={p.name} style={{width:140,height:52,flex:'none',borderRadius:'var(--radius-md)',background:'#fff',border:'1px solid var(--slate-200)',display:'grid',placeItems:'center',padding:'0 16px',boxShadow:'var(--shadow-sm)'}}>
        <img src={logo(p.domain)} alt={p.name} loading="lazy" style={{maxWidth:'100%',maxHeight:28,objectFit:'contain',filter:'grayscale(1)',opacity:.7,transition:'filter .2s,opacity .2s'}} onMouseOver={e=>{e.currentTarget.style.filter='none';e.currentTarget.style.opacity=1;}} onMouseOut={e=>{e.currentTarget.style.filter='grayscale(1)';e.currentTarget.style.opacity=.7;}} onError={e=>{e.currentTarget.style.display='none';e.currentTarget.parentNode.textContent=p.name;e.currentTarget.parentNode.style.fontSize='.75rem';e.currentTarget.parentNode.style.color='var(--slate-500)';e.currentTarget.parentNode.style.fontWeight='600';}}/>
      </div>)}
    </div></div>;
  return <section style={{background:'var(--muted)',padding:'56px 0'}}>
    <style>{'@keyframes tcgmarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media (prefers-reduced-motion: reduce){[style*="tcgmarquee"]{animation:none!important}}'}</style>
    <div style={{...container,display:'grid',gap:14}}>
      <Row items={partners.slice(0,6)} dur={30} delay={0}/>
      <Row items={partners.slice(6)} dur={18} delay={0}/>
    </div></section>;
}
function SectionHead({kicker,title,sub}){
  return <div className="reveal" style={{display:'grid',gap:10,justifyItems:'center',textAlign:'center',marginBottom:40}}>
    {kicker&&<span style={{fontSize:'.75rem',fontWeight:600,letterSpacing:'.12em',textTransform:'uppercase',color:'var(--brick-500)'}}>{kicker}</span>}
    <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'var(--text-h2)',fontWeight:600,lineHeight:1.18,color:'var(--primary)',textWrap:'balance'}}>{title}</h2>
    {sub&&<p style={{margin:0,color:'var(--muted-foreground)',fontSize:'var(--text-body-lg)',maxWidth:640}}>{sub}</p>}
  </div>;
}
const FEATURED_SERVICES=[
  {slug:'san-bay',icon:'plane',label:'Sân bay',title:'Tiếp cận nhóm khách chi trả cao',desc:'Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn: băng chuyền, sảnh đến/đi, ống lồng. Tiếp cận doanh nhân, khách du lịch và khách quốc tế trong thời gian chờ chuyến kéo dài.',img:'/v1-assets/assets/ooh/noibai-41b.jpg',cta:'Xem dịch vụ sân bay'},
  {slug:'billboard',icon:'rectangle-horizontal',label:'Billboard',title:'Hiện diện tại cửa ngõ và trục đường lớn',desc:'Biển quảng cáo tấm lớn tại nút giao, cửa ngõ đô thị và cao tốc trên 30+ tỉnh thành. Khảo sát, thiết kế, in ấn và thi công trọn gói, hỗ trợ giấy phép quảng cáo.',img:'/v1-assets/assets/ooh/phapvan-19a.png',cta:'Xem dịch vụ billboard'},
  {slug:'led',icon:'monitor',label:'Màn hình LED',title:'Nội dung linh hoạt, đổi theo khung giờ',desc:'LED ngoài trời và LCD/frame tại thang máy, trung tâm thương mại. Đặt theo spot 15 đến 30 giây, đổi nội dung nhanh, báo cáo tần suất phát thực tế.',img:'/v1-assets/assets/ooh/hanoi-cg01-nct.png',cta:'Xem dịch vụ LED'},
  {slug:'pano',icon:'lamp',label:'Pano · Hộp đèn',title:'Phủ dày theo tuyến, chi phí hợp lý',desc:'Quảng cáo tại nhà chờ xe bus, giải phân cách và tuyến phố. Chi phí vào cửa thấp, phù hợp chiến dịch khu vực và mở điểm bán, có combo nhiều mặt giảm chi phí.',img:'/v1-assets/assets/ooh/quangninh-hl16.jpg',cta:'Xem dịch vụ pano'},
  {slug:null,icon:'briefcase',label:'Dự án tiêu biểu',title:'Đồng hành cùng 400+ nhãn hàng',desc:'Từ FMCG, ngân hàng đến hàng không và công nghệ. Xem các chiến dịch OOH tiêu biểu Toàn Cầu ADV đã triển khai trên toàn quốc.',img:'/v1-assets/assets/ooh/haiphong-caurao2.jpg',cta:'Xem dự án tiêu biểu',href:'news.html'}
];
function Spotlight(){
  const [i,setI]=React.useState(0);
  const s=FEATURED_SERVICES[i];
  return <section id="spotlight" style={{padding:'88px 0'}}>
    <div style={container}>
      <SectionHead kicker="Dịch vụ nổi bật" title="Giải pháp OOH của Toàn Cầu" sub="Khám phá các nhóm dịch vụ chính, từ sân bay đến billboard, LED và nhà chờ."/>
      <div className="reveal" style={{display:'grid',gridTemplateColumns:'220px 1.15fr 1fr',gap:28,alignItems:'stretch'}}>
        <div style={{display:'grid',gap:10,alignContent:'start'}}>
          {FEATURED_SERVICES.map((f,idx)=><button key={f.label} className="tcg-lift" onClick={()=>setI(idx)} style={{display:'flex',alignItems:'center',gap:10,height:56,padding:'0 18px',borderRadius:'var(--radius-md)',border:idx===i?'none':'1px solid var(--border)',background:idx===i?'linear-gradient(115deg,var(--blue-900),var(--blue-500))':'#fff',color:idx===i?'#fff':'var(--foreground)',fontWeight:600,fontSize:'.9375rem',fontFamily:'var(--font-sans)',cursor:'pointer',textAlign:'left',boxShadow:idx===i?'var(--shadow-md)':'none',transition:'all var(--dur-base) var(--ease-out)'}}>
            <window.Icon name={f.icon} size={18}/>{f.label}
          </button>)}
        </div>
        <div className="tcg-card tcg-media" style={{minHeight:320}}>
          <img key={s.img} className="tcg-fadeup" src={s.img} alt={s.label} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
        </div>
        <div key={s.title} className="tcg-fadeup" style={{display:'grid',gap:14,alignContent:'center'}}>
          <span style={{display:'inline-flex',alignItems:'center',gap:7,fontSize:'.75rem',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--blue-600)'}}><window.Icon name={s.icon} size={15}/>{s.label}</span>
          <h3 style={{margin:0,fontFamily:'var(--font-display)',fontSize:'var(--text-h3)',fontWeight:600,color:'var(--primary)',lineHeight:1.3}}>{s.title}</h3>
          <p style={{margin:0,fontSize:'.9375rem',color:'var(--slate-600)',lineHeight:1.7}}>{s.desc}</p>
          <div><Button variant="cta" onClick={()=>{window.location.href=s.href||('services.html#svc-'+s.slug)}}>{s.cta}</Button></div>
        </div>
      </div></div></section>;
}
Object.assign(window,{Icon,Navbar,Hero,Stats,SectionHead,Spotlight,go,goContact,container});

/* Scroll-FX toàn cục (mọi trang): scroll-reveal + thanh tiến trình. Không dùng React state.
   MutationObserver bắt cả node do React render sau, nên .reveal luôn được kích hoạt. */
(function(){
  if(window.__tcgFx)return;window.__tcgFx=1;
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO=('IntersectionObserver' in window);
  function initBar(){
    if(document.querySelector('.tcg-progress'))return;
    var bar=document.createElement('div');bar.className='tcg-progress';document.body.appendChild(bar);
    if(reduce)return;
    var ticking=false;
    function onScroll(){if(ticking)return;ticking=true;requestAnimationFrame(function(){
      var h=document.documentElement.scrollHeight-window.innerHeight;
      var p=h>0?Math.min(Math.max(window.scrollY/h,0),1):0;
      bar.style.transform='scaleX('+p+')';ticking=false;});}
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll,{passive:true});onScroll();
  }
  var io=null;
  function ensureIO(){
    if(io||reduce||!hasIO)return;
    io=new IntersectionObserver(function(entries){entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},
      {threshold:0.14,rootMargin:'0px 0px -8% 0px'});
  }
  function reveal(){
    var els=document.querySelectorAll('.reveal,.reveal-fade,.reveal-scale,.reveal-group,.tcg-timeline-line');
    if(reduce||!hasIO){for(var i=0;i<els.length;i++)els[i].classList.add('is-visible');return;}
    ensureIO();
    for(var j=0;j<els.length;j++){var el=els[j];if(!el.__tcgObs){el.__tcgObs=1;io.observe(el);}}
  }
  // Đếm số tăng dần khi vào khung nhìn: <strong data-countup="730" data-suffix="+">730+</strong>
  var cio=null;
  function animateCount(el){
    var target=parseFloat(el.getAttribute('data-countup'))||0;
    var prefix=el.getAttribute('data-prefix')||'',suffix=el.getAttribute('data-suffix')||'';
    var t0=null,dur=1400;
    function step(ts){
      if(!t0)t0=ts;
      var p=Math.min((ts-t0)/dur,1),e=1-Math.pow(1-p,3);
      el.textContent=prefix+Math.round(target*e)+suffix;
      if(p<1)requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  function counts(){
    if(reduce||!hasIO)return; // giữ giá trị tĩnh sẵn có trong markup
    var els=document.querySelectorAll('[data-countup]');
    for(var i=0;i<els.length;i++){
      var el=els[i];if(el.__tcgCnt)continue;el.__tcgCnt=1;
      if(!cio)cio=new IntersectionObserver(function(es){es.forEach(function(e){
        if(e.isIntersecting){cio.unobserve(e.target);animateCount(e.target);}});},{threshold:.5});
      cio.observe(el);
    }
  }
  // Parallax nhẹ cho khối trang trí/ảnh: <div data-parallax="0.07">. Chỉ transform, không reflow.
  var pEls=[],pTick=false;
  function parallaxScroll(){
    if(pTick)return;pTick=true;
    requestAnimationFrame(function(){
      pTick=false;
      var vh=window.innerHeight;
      for(var i=0;i<pEls.length;i++){
        var el=pEls[i],r=el.getBoundingClientRect();
        if(r.bottom<-80||r.top>vh+80)continue;
        var applied=el.__tcgOff||0;
        var center=r.top-applied+r.height/2-vh/2;
        var off=center*(parseFloat(el.getAttribute('data-parallax'))||0.07);
        off=Math.max(-36,Math.min(36,off));
        el.__tcgOff=off;
        el.style.transform='translateY('+off.toFixed(1)+'px)';
      }
    });
  }
  function parallax(){
    if(reduce)return;
    var els=document.querySelectorAll('[data-parallax]'),added=false;
    for(var i=0;i<els.length;i++){if(!els[i].__tcgPar){els[i].__tcgPar=1;els[i].style.willChange='transform';pEls.push(els[i]);added=true;}}
    if(added&&!window.__tcgParOn){
      window.__tcgParOn=1;
      window.addEventListener('scroll',parallaxScroll,{passive:true});
      window.addEventListener('resize',parallaxScroll,{passive:true});
    }
    if(added)parallaxScroll();
  }
  // Navbar đổ bóng/thu gọn khi rời đỉnh trang + nút lên đầu trang sau ~1.6 màn hình
  function navTop(){
    if(!document.querySelector('.tcg-totop')){
      var b=document.createElement('button');
      b.className='tcg-totop';b.type='button';b.setAttribute('aria-label','Lên đầu trang');
      b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
      b.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
      document.body.appendChild(b);
    }
    if(!window.__tcgNavOn){
      window.__tcgNavOn=1;
      var on=function(){
        var n=document.querySelector('.tcg-nav');
        if(n)n.classList.toggle('is-scrolled',window.scrollY>10);
        var t=document.querySelector('.tcg-totop');
        if(t)t.classList.toggle('show',window.scrollY>window.innerHeight*1.6);
      };
      window.addEventListener('scroll',on,{passive:true});on();
    }
  }
  var scheduled=false;
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){scheduled=false;reveal();counts();parallax();navTop();});}
  function boot(){
    initBar();reveal();counts();parallax();navTop();
    // Anchor trong hash (vd. #lien-he) do React render sau khi load — chờ phần tử xuất hiện rồi cuộn tới.
    if(location.hash&&/^#[\w-]+$/.test(location.hash)){
      var tries=0,tt=setInterval(function(){
        var el=document.querySelector(location.hash);
        if(el){clearInterval(tt);if(window.go)window.go(location.hash);}
        else if(++tries>40)clearInterval(tt);
      },150);
    }
    if('MutationObserver' in window){
      new MutationObserver(function(muts){
        for(var i=0;i<muts.length;i++){if(muts[i].addedNodes&&muts[i].addedNodes.length){schedule();break;}}
      }).observe(document.body,{childList:true,subtree:true});
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
