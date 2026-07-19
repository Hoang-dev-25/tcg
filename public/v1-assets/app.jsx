const NSA=window.ToNCUADVDesignSystem_ce468e;
function MissingBundle(){
  return <div style={{minHeight:'60vh',display:'grid',placeItems:'center',fontFamily:'var(--font-sans)'}}>
    <div style={{display:'grid',gap:12,justifyItems:'center',textAlign:'center'}}>
      <strong style={{fontSize:'1.25rem',color:'var(--primary)'}}>Đang biên dịch design system…</strong>
      <p style={{margin:0,color:'var(--muted-foreground)'}}>_ds_bundle.js chưa sẵn sàng. Vui lòng tải lại trang.</p>
      <button onClick={()=>location.reload()} style={{height:44,padding:'0 20px',border:'none',borderRadius:8,background:'var(--primary,#12315E)',color:'#fff',fontWeight:600,fontFamily:'inherit',cursor:'pointer'}}>Tải lại</button>
    </div></div>;
}
function App(){
  const [cart,setCart]=React.useState([]);
  const [toast,setToast]=React.useState(null);
  const add=l=>{setCart(c=>c.some(x=>x.id===l.id)?c:[...c,l]);setToast({kind:'success',title:'Đã thêm vào báo giá',message:l.name});setTimeout(()=>setToast(null),2600)};
  const total=cart.reduce((s,l)=>s+l.priceN,0);
  return <div style={{fontFamily:'var(--font-sans)'}}>
    <window.Navbar onQuote={()=>window.go('#lead')}/>
    <window.Hero/>
    <window.Stats/>
    <window.Spotlight/>
    <window.MapPreview/>
    <window.Journey/>
    <window.Cases/>
    <window.LeadForm onToast={t=>{setToast(t);setTimeout(()=>setToast(null),3200)}}/>
    <window.CTABand/>
    <window.Footer/>
    <NSA.QuoteTray fixed count={cart.length} total={total?window.TCG_DATA.fmt(total):null} onSubmit={()=>{setToast({kind:'success',title:'Báo giá PDF nháp đang được tạo',message:cart.length+' vị trí đã chọn'});setTimeout(()=>setToast(null),3000)}}/>
    {toast&&<div style={{position:'fixed',top:88,right:24,zIndex:60}}><NSA.Toast kind={toast.kind} title={toast.title} message={toast.message} onClose={()=>setToast(null)}/></div>}
  </div>;
}
ReactDOM.createRoot(document.getElementById('root')).render(NSA&&NSA.QuoteTray?<App/>:<MissingBundle/>);
