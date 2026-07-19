/* @ds-bundle: {"format":4,"namespace":"ToNCUADVDesignSystem_ce468e","components":[{"name":"AIScoreBadge","sourcePath":"components/badges/AIScoreBadge.jsx"},{"name":"StatusPill","sourcePath":"components/badges/StatusPill.jsx"},{"name":"TypeBadge","sourcePath":"components/badges/TypeBadge.jsx"},{"name":"CaseStudyCard","sourcePath":"components/cards/CaseStudyCard.jsx"},{"name":"LocationCard","sourcePath":"components/cards/LocationCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Skeleton","sourcePath":"components/feedback/Toast.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/Toast.jsx"},{"name":"ErrorState","sourcePath":"components/feedback/Toast.jsx"},{"name":"FilterBar","sourcePath":"components/filters/FilterBar.jsx"},{"name":"FilterChip","sourcePath":"components/filters/FilterChip.jsx"},{"name":"Field","sourcePath":"components/forms/Input.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Input.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Input.jsx"},{"name":"MapMarker","sourcePath":"components/map/MapMarker.jsx"},{"name":"MapPopup","sourcePath":"components/map/MapMarker.jsx"},{"name":"QuoteTray","sourcePath":"components/quote/QuoteTray.jsx"},{"name":"TrustStats","sourcePath":"components/sections/TrustStats.jsx"}],"sourceHashes":{"app-map.jsx":"ce4dc5b6f888","app-news.jsx":"591c7b4570b4","app.jsx":"063e0969cb9f","components/badges/AIScoreBadge.jsx":"02dec63bc983","components/badges/StatusPill.jsx":"cdfa499594c0","components/badges/TypeBadge.jsx":"5075d07117c8","components/cards/CaseStudyCard.jsx":"159afc7239e9","components/cards/LocationCard.jsx":"b31eb176b2ae","components/core/Button.jsx":"8d785b0b5ffa","components/feedback/Toast.jsx":"1f07c20384aa","components/filters/FilterBar.jsx":"5cc9a4527baa","components/filters/FilterChip.jsx":"dbc3d2caa37c","components/forms/Input.jsx":"c377c065866f","components/map/MapMarker.jsx":"4074c787c41b","components/quote/QuoteTray.jsx":"c498f736c42a","components/sections/TrustStats.jsx":"f96c36d076b9","sections2.jsx":"adc7387e7f24","ui_kits/website/app-about.jsx":"37cb80ed24f7","ui_kits/website/app-contact.jsx":"674289fa1e4e","ui_kits/website/app-map.jsx":"93f08e64267a","ui_kits/website/app-news.jsx":"fb33e3afce38","ui_kits/website/app-services.jsx":"50ceaa03ccb0","ui_kits/website/app.jsx":"2e38f7beba88","ui_kits/website/data.js":"870ed208ca17","ui_kits/website/sections.jsx":"b83a79bd6992","ui_kits/website/sections.standalone.jsx":"6c18af50f0f4","ui_kits/website/sections2.jsx":"054765f8a256","ui_kits/website/sections2.standalone.jsx":"64591eb0b172"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ToNCUADVDesignSystem_ce468e = window.ToNCUADVDesignSystem_ce468e || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// app-map.jsx
try { (() => {
const NSM = window.ToNCUADVDesignSystem_ce468e;
function PageHead({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '56px 0'
    },
    "data-comment-anchor": "0703e55a15-div-3-10"
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h1)',
      fontWeight: 600,
      lineHeight: 1.12
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--blue-100)',
      maxWidth: 640
    }
  }, sub)));
}
function App() {
  const [cart, setCart] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const add = l => {
    setCart(c => c.some(x => x.id === l.id) ? c : [...c, l]);
    setToast({
      kind: 'success',
      title: 'Đã thêm vào báo giá',
      message: l.name
    });
    setTimeout(() => setToast(null), 2600);
  };
  const total = cart.reduce((s, l) => s + l.priceN, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement(PageHead, {
    title: "B\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED OOH to\xE0n qu\u1ED1c",
    sub: "L\u1ECDc theo t\u1EC9nh/th\xE0nh, lo\u1EA1i bi\u1EC3n, ng\xE2n s\xE1ch. Ch\u1ECDn v\u1ECB tr\xED \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1 trong v\xE0i ph\xFAt."
  }), /*#__PURE__*/React.createElement(window.MapSection, {
    onAdd: add,
    hideHead: true
  }), /*#__PURE__*/React.createElement(window.Footer, null), /*#__PURE__*/React.createElement(NSM.QuoteTray, {
    fixed: true,
    count: cart.length,
    total: total ? window.TCG_DATA.fmt(total) : null,
    onSubmit: () => {
      setToast({
        kind: 'success',
        title: 'Báo giá PDF nháp đang được tạo',
        message: cart.length + ' vị trí đã chọn'
      });
      setTimeout(() => setToast(null), 3000);
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 88,
      right: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(NSM.Toast, {
    kind: toast.kind,
    title: toast.title,
    message: toast.message,
    onClose: () => setToast(null)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSM && NSM.QuoteTray ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-map.jsx", error: String((e && e.message) || e) }); }

// app-news.jsx
try { (() => {
const NSN = window.ToNCUADVDesignSystem_ce468e;
function PageHead({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '56px 0'
    },
    "data-comment-anchor": "659f405724-div-3-10"
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h1)',
      fontWeight: 600,
      lineHeight: 1.12
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--blue-100)',
      maxWidth: 640
    }
  }, sub)));
}
function App() {
  const D = window.TCG_DATA;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement(PageHead, {
    title: "Tin t\u1EE9c",
    sub: "C\u1EADp nh\u1EADt h\u1EC7 th\u1ED1ng v\u1ECB tr\xED, s\u1EA3n ph\u1EA9m v\xE0 ho\u1EA1t \u0111\u1ED9ng c\u1EE7a To\xE0n C\u1EA7u ADV."
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, D.news.map(n => /*#__PURE__*/React.createElement("article", {
    key: n.title,
    style: {
      display: 'grid',
      gap: 0,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: n.img,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '16/9',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px 22px',
      display: 'grid',
      gap: 8,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)'
    }
  }, n.date), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, n.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      color: 'var(--slate-600)',
      lineHeight: 1.6
    }
  }, n.excerpt), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: '.9375rem',
      fontWeight: 600,
      color: 'var(--primary)',
      cursor: 'pointer'
    }
  }, "\u0110\u1ECDc ti\u1EBFp \u2192")))))), /*#__PURE__*/React.createElement(window.Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSN ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app-news.jsx", error: String((e && e.message) || e) }); }

// app.jsx
try { (() => {
const NSA = window.ToNCUADVDesignSystem_ce468e;
function MissingBundle() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '60vh',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1.25rem',
      color: 'var(--primary)'
    }
  }, "\u0110ang bi\xEAn d\u1ECBch design system\u2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)'
    }
  }, "_ds_bundle.js ch\u01B0a s\u1EB5n s\xE0ng. Vui l\xF2ng t\u1EA3i l\u1EA1i trang."), /*#__PURE__*/React.createElement("button", {
    onClick: () => location.reload(),
    style: {
      height: 44,
      padding: '0 20px',
      border: 'none',
      borderRadius: 8,
      background: 'var(--primary,#12315E)',
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "T\u1EA3i l\u1EA1i")));
}
function App() {
  const [cart, setCart] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const add = l => {
    setCart(c => c.some(x => x.id === l.id) ? c : [...c, l]);
    setToast({
      kind: 'success',
      title: 'Đã thêm vào báo giá',
      message: l.name
    });
    setTimeout(() => setToast(null), 2600);
  };
  const total = cart.reduce((s, l) => s + l.priceN, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, {
    onQuote: () => window.go('#lead')
  }), /*#__PURE__*/React.createElement(window.Hero, null), /*#__PURE__*/React.createElement(window.Stats, null), /*#__PURE__*/React.createElement(window.Spotlight, null), /*#__PURE__*/React.createElement(window.MapPreview, null), /*#__PURE__*/React.createElement(window.Journey, {
    "data-comment-anchor": "5031c55a7f-div-215-16"
  }), /*#__PURE__*/React.createElement(window.Services, null), /*#__PURE__*/React.createElement(window.Cases, null), /*#__PURE__*/React.createElement(window.LeadForm, {
    onToast: t => {
      setToast(t);
      setTimeout(() => setToast(null), 3200);
    }
  }), /*#__PURE__*/React.createElement(window.CTABand, null), /*#__PURE__*/React.createElement(window.Footer, null), /*#__PURE__*/React.createElement(NSA.QuoteTray, {
    fixed: true,
    count: cart.length,
    total: total ? window.TCG_DATA.fmt(total) : null,
    onSubmit: () => {
      setToast({
        kind: 'success',
        title: 'Báo giá PDF nháp đang được tạo',
        message: cart.length + ' vị trí đã chọn'
      });
      setTimeout(() => setToast(null), 3000);
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 88,
      right: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(NSA.Toast, {
    kind: toast.kind,
    title: toast.title,
    message: toast.message,
    onClose: () => setToast(null)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSA && NSA.QuoteTray ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement(MissingBundle, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "app.jsx", error: String((e && e.message) || e) }); }

// components/badges/AIScoreBadge.jsx
try { (() => {
function AIScoreBadge({
  score = 0,
  reason,
  method,
  size = 'md',
  style
}) {
  const tier = score >= 80 ? {
    label: 'Cao',
    c: 'var(--score-high)'
  } : score >= 60 ? {
    label: 'Khá',
    c: 'var(--score-good)'
  } : score >= 40 ? {
    label: 'Trung bình',
    c: 'var(--score-mid)'
  } : {
    label: 'Thấp',
    c: 'var(--score-low)'
  };
  const sm = size === 'sm';
  return React.createElement('span', {
    title: reason ? `${reason}${method ? ` · phương pháp: ${method}` : ''}` : undefined,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: sm ? '2px 8px' : '4px 10px',
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      border: `1.5px solid ${tier.c}`,
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: sm ? '.8125rem' : '.9375rem',
      color: tier.c
    }
  }, '◆ ' + score), React.createElement('span', {
    style: {
      fontSize: sm ? '.6875rem' : '.75rem',
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, tier.label));
}
Object.assign(__ds_scope, { AIScoreBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/AIScoreBadge.jsx", error: String((e && e.message) || e) }); }

// components/badges/StatusPill.jsx
try { (() => {
function StatusPill({
  status = 'available',
  style
}) {
  const m = {
    available: {
      label: 'Còn trống',
      c: 'var(--status-available)'
    },
    soon: {
      label: 'Sắp hết',
      c: 'var(--status-soon)'
    },
    booked: {
      label: 'Đã đặt',
      c: 'var(--status-booked)'
    }
  }[status];
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '.75rem',
      fontWeight: 600,
      color: m.c,
      background: 'color-mix(in srgb, ' + (status === 'booked' ? '#94A3B8' : status === 'soon' ? '#F59E0B' : '#16A34A') + ' 12%, white)',
      ...style
    }
  }, React.createElement('span', {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: m.c,
      flex: 'none'
    }
  }), m.label);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/badges/TypeBadge.jsx
try { (() => {
function TypeBadge({
  children,
  style
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '3px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '.75rem',
      fontWeight: 600,
      background: 'var(--muted)',
      color: 'var(--primary)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { TypeBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/badges/TypeBadge.jsx", error: String((e && e.message) || e) }); }

// components/cards/CaseStudyCard.jsx
try { (() => {
function CaseStudyCard({
  brand,
  industry,
  result,
  image,
  onDetail,
  style
}) {
  const [hov, setHov] = React.useState(false);
  return React.createElement('div', {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      width: 340,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hov ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard)',
      display: 'flex',
      flexDirection: 'column',
      ...style
    }
  }, React.createElement('div', {
    style: {
      aspectRatio: '16/9',
      background: 'linear-gradient(160deg,var(--slate-200),var(--slate-400))',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--slate-600)',
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.06em'
    }
  }, image ? React.createElement('img', {
    src: image,
    alt: brand,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : 'ẢNH CHIẾN DỊCH'), React.createElement('div', {
    style: {
      padding: '16px 18px 18px',
      display: 'grid',
      gap: 6,
      flex: 1,
      alignContent: 'start'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 600
    }
  }, brand), React.createElement('div', {
    style: {
      fontSize: '.875rem',
      color: 'var(--muted-foreground)'
    }
  }, [industry, result].filter(Boolean).join(' · ')), onDetail && React.createElement('a', {
    onClick: onDetail,
    style: {
      marginTop: 6,
      fontSize: '.875rem',
      fontWeight: 600,
      color: 'var(--primary)',
      cursor: 'pointer'
    }
  }, 'Xem chi tiết →')));
}
Object.assign(__ds_scope, { CaseStudyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CaseStudyCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  children,
  onClick,
  style,
  ...rest
}) {
  const pal = {
    primary: {
      bg: 'var(--primary)',
      fg: 'var(--primary-foreground)',
      hov: 'var(--navy-500)',
      act: 'var(--navy-700)',
      bd: 'transparent'
    },
    cta: {
      bg: 'var(--cta)',
      fg: 'var(--cta-foreground)',
      hov: 'var(--amber-500)',
      act: 'var(--amber-600)',
      bd: 'transparent'
    },
    secondary: {
      bg: 'var(--secondary)',
      fg: 'var(--secondary-foreground)',
      hov: 'var(--slate-200)',
      act: 'var(--slate-300)',
      bd: 'transparent'
    },
    outline: {
      bg: 'transparent',
      fg: 'var(--primary)',
      hov: 'var(--navy-50)',
      act: 'var(--navy-100)',
      bd: 'var(--border)'
    },
    'outline-inverse': {
      bg: 'transparent',
      fg: '#fff',
      hov: 'rgba(255,255,255,.12)',
      act: 'rgba(255,255,255,.2)',
      bd: 'rgba(255,255,255,.4)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--primary)',
      hov: 'var(--navy-50)',
      act: 'var(--navy-100)',
      bd: 'transparent'
    },
    destructive: {
      bg: 'var(--destructive)',
      fg: '#fff',
      hov: '#B91C1C',
      act: '#991B1B',
      bd: 'transparent'
    }
  }[variant] || {};
  const sz = {
    sm: {
      h: 36,
      px: 14,
      fs: '.875rem'
    },
    md: {
      h: 44,
      px: 20,
      fs: '1rem'
    },
    lg: {
      h: 52,
      px: 28,
      fs: '1.125rem'
    }
  }[size];
  const [hov, setHov] = React.useState(false),
    [act, setAct] = React.useState(false);
  const off = disabled || loading;
  return React.createElement('button', {
    onClick: off ? undefined : onClick,
    disabled: off,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => {
      setHov(false);
      setAct(false);
    },
    onMouseDown: () => setAct(true),
    onMouseUp: () => setAct(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: sz.h,
      padding: `0 ${sz.px}px`,
      fontSize: sz.fs,
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      background: off ? pal.bg : act ? pal.act : hov ? pal.hov : pal.bg,
      color: pal.fg,
      border: `1px solid ${pal.bd}`,
      borderRadius: 'var(--radius-md)',
      cursor: off ? 'not-allowed' : 'pointer',
      opacity: disabled ? .55 : 1,
      transition: 'background var(--dur-fast) var(--ease-standard)',
      whiteSpace: 'nowrap',
      ...style
    },
    ...rest
  }, loading && React.createElement('span', {
    style: {
      width: 16,
      height: 16,
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'tcgspin .7s linear infinite',
      flex: 'none'
    }
  }), children, loading && injectSpin());
}
function injectSpin() {
  if (typeof document !== 'undefined' && !document.getElementById('tcgspin')) {
    const s = document.createElement('style');
    s.id = 'tcgspin';
    s.textContent = '@keyframes tcgspin{to{transform:rotate(360deg)}}';
    document.head.appendChild(s);
  }
  return null;
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/LocationCard.jsx
try { (() => {
function LocationCard({
  name,
  type = 'Billboard',
  city,
  size,
  price,
  status = 'available',
  score,
  reason,
  image,
  selected = false,
  unavailable,
  onSelect,
  onAdd,
  style
}) {
  const [hov, setHov] = React.useState(false);
  const off = unavailable || status === 'booked';
  return React.createElement('div', {
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    onClick: onSelect,
    style: {
      width: 300,
      background: 'var(--card)',
      border: selected ? '2px solid var(--primary)' : '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: hov && !off ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      transform: hov && !off ? 'translateY(-2px)' : 'none',
      transition: 'box-shadow var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard)',
      opacity: off ? .6 : 1,
      cursor: onSelect ? 'pointer' : 'default',
      ...style
    }
  }, React.createElement('div', {
    style: {
      position: 'relative',
      aspectRatio: '4/3',
      background: 'linear-gradient(160deg,var(--navy-100),var(--navy-300))'
    }
  }, image ? React.createElement('img', {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      color: 'var(--navy-600)',
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.06em'
    }
  }, 'ẢNH VỊ TRÍ'), React.createElement(__ds_scope.TypeBadge, {
    style: {
      position: 'absolute',
      top: 10,
      left: 10,
      background: 'rgba(255,255,255,.92)'
    }
  }, type), score != null && React.createElement(__ds_scope.AIScoreBadge, {
    score,
    reason,
    size: 'sm',
    style: {
      position: 'absolute',
      top: 8,
      right: 10
    }
  })), React.createElement('div', {
    style: {
      padding: '14px 16px 16px',
      display: 'grid',
      gap: 8
    }
  }, React.createElement('div', {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, name), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'baseline',
      color: 'var(--muted-foreground)',
      fontSize: '.875rem'
    }
  }, city && React.createElement('span', null, city), size && React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, size)), price && React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: '1.0625rem',
      color: 'var(--primary)'
    }
  }, price), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8
    }
  }, React.createElement(__ds_scope.StatusPill, {
    status
  }), onAdd && !off && React.createElement(__ds_scope.Button, {
    variant: 'outline',
    size: 'sm',
    onClick: e => {
      e && e.stopPropagation && e.stopPropagation();
      onAdd();
    }
  }, '+ Thêm báo giá')), reason && React.createElement('div', {
    style: {
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      borderTop: '1px solid var(--border)',
      paddingTop: 8
    }
  }, '“' + reason + '”')));
}
Object.assign(__ds_scope, { LocationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/LocationCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Skeleton({
  width = '100%',
  height = 16,
  radius = 'var(--radius-md)',
  style
}) {
  injectPulse();
  return React.createElement('div', {
    style: {
      width,
      height,
      borderRadius: radius,
      background: 'var(--muted)',
      animation: 'tcgpulse 1.4s ease-in-out infinite',
      ...style
    }
  });
}
function injectPulse() {
  if (typeof document !== 'undefined' && !document.getElementById('tcgpulse')) {
    const s = document.createElement('style');
    s.id = 'tcgpulse';
    s.textContent = '@keyframes tcgpulse{0%,100%{opacity:1}50%{opacity:.45}}@media (prefers-reduced-motion: reduce){[style*="tcgpulse"]{animation:none}}';
    document.head.appendChild(s);
  }
}
function Toast({
  kind = 'success',
  title,
  message,
  onClose,
  style
}) {
  const m = {
    success: {
      c: 'var(--success)',
      icon: '✓'
    },
    error: {
      c: 'var(--destructive)',
      icon: '✕'
    },
    info: {
      c: 'var(--info)',
      icon: 'ℹ'
    }
  }[kind];
  return React.createElement('div', {
    role: 'status',
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      width: 360,
      padding: '14px 16px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderLeft: `3px solid ${m.c}`,
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      ...style
    }
  }, React.createElement('span', {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: m.c,
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: '.75rem',
      fontWeight: 700,
      flex: 'none'
    }
  }, m.icon), React.createElement('div', {
    style: {
      display: 'grid',
      gap: 2,
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 600,
      fontSize: '.9375rem'
    }
  }, title), message && React.createElement('div', {
    style: {
      fontSize: '.875rem',
      color: 'var(--muted-foreground)'
    }
  }, message)), onClose && React.createElement('button', {
    onClick: onClose,
    'aria-label': 'Đóng',
    style: {
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      fontSize: '1rem',
      lineHeight: 1
    }
  }, '✕'));
}
function EmptyState({
  title = 'Không có vị trí phù hợp',
  hint = 'Thử nới rộng bộ lọc hoặc chọn tỉnh/thành khác.',
  action,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 8,
      padding: '40px 24px',
      textAlign: 'center',
      ...style
    }
  }, React.createElement('div', {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'var(--muted)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--muted-foreground)',
      fontSize: '1.25rem'
    }
  }, '⌕'), React.createElement('div', {
    style: {
      fontWeight: 600,
      fontSize: '1.0625rem'
    }
  }, title), React.createElement('div', {
    style: {
      fontSize: '.875rem',
      color: 'var(--muted-foreground)',
      maxWidth: 360
    }
  }, hint), action);
}
function ErrorState({
  title = 'Không tải được dữ liệu',
  hint = 'Vui lòng kiểm tra kết nối và thử lại.',
  onRetry,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'grid',
      justifyItems: 'center',
      gap: 8,
      padding: '40px 24px',
      textAlign: 'center',
      ...style
    }
  }, React.createElement('div', {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'rgba(220,38,38,.1)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--destructive)',
      fontSize: '1.1rem',
      fontWeight: 700
    }
  }, '!'), React.createElement('div', {
    style: {
      fontWeight: 600,
      fontSize: '1.0625rem'
    }
  }, title), React.createElement('div', {
    style: {
      fontSize: '.875rem',
      color: 'var(--muted-foreground)',
      maxWidth: 360
    }
  }, hint), onRetry && React.createElement('button', {
    onClick: onRetry,
    style: {
      marginTop: 6,
      height: 40,
      padding: '0 18px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      background: '#fff',
      color: 'var(--primary)',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, 'Thử lại'));
}
Object.assign(__ds_scope, { Skeleton, Toast, EmptyState, ErrorState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/filters/FilterBar.jsx
try { (() => {
function FilterBar({
  resultCount,
  onClear,
  children,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      ...style
    }
  }, children, React.createElement('span', {
    style: {
      flex: 1
    }
  }), resultCount != null && React.createElement('span', {
    style: {
      fontSize: '.875rem',
      color: 'var(--muted-foreground)'
    }
  }, React.createElement('strong', {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--foreground)'
    }
  }, resultCount), ' vị trí'), onClear && React.createElement(__ds_scope.Button, {
    variant: 'ghost',
    size: 'sm',
    onClick: onClear
  }, 'Xóa lọc'));
}
Object.assign(__ds_scope, { FilterBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/filters/FilterBar.jsx", error: String((e && e.message) || e) }); }

// components/filters/FilterChip.jsx
try { (() => {
function FilterChip({
  active = false,
  onClick,
  onRemove,
  children,
  style
}) {
  const [hov, setHov] = React.useState(false);
  return React.createElement('button', {
    onClick,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 36,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      fontSize: '.875rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      background: active ? 'var(--secondary)' : hov ? 'var(--slate-50)' : '#fff',
      color: active ? 'var(--secondary-foreground)' : 'var(--slate-600)',
      border: active ? '1.5px solid var(--primary)' : '1px solid var(--border)',
      transition: 'background var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, children, active && onRemove && React.createElement('span', {
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    'aria-label': 'Gỡ bộ lọc',
    style: {
      fontWeight: 700,
      lineHeight: 1,
      padding: '0 2px'
    }
  }, '✕'));
}
Object.assign(__ds_scope, { FilterChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/filters/FilterChip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
const fieldBase = {
  width: '100%',
  height: 44,
  padding: '0 14px',
  fontSize: '1rem',
  fontFamily: 'var(--font-sans)',
  color: 'var(--foreground)',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius-md)',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color var(--dur-fast),box-shadow var(--dur-fast)'
};
function Field({
  label,
  required,
  error,
  hint,
  htmlFor,
  children
}) {
  return React.createElement('div', {
    style: {
      display: 'grid',
      gap: 6
    }
  }, label && React.createElement('label', {
    htmlFor,
    style: {
      fontSize: '.875rem',
      fontWeight: 600
    }
  }, label, required && React.createElement('span', {
    style: {
      color: 'var(--destructive)'
    }
  }, ' *')), children, error ? React.createElement('div', {
    role: 'alert',
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      fontSize: '.8125rem',
      color: 'var(--destructive)',
      fontWeight: 500
    }
  }, '⚠ ' + error) : hint && React.createElement('div', {
    style: {
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)'
    }
  }, hint));
}
function Input({
  error,
  disabled,
  style,
  ...rest
}) {
  const [foc, setFoc] = React.useState(false);
  return React.createElement('input', {
    disabled,
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    'aria-invalid': error ? 'true' : undefined,
    style: {
      ...fieldBase,
      borderColor: error ? 'var(--destructive)' : foc ? 'var(--ring)' : 'var(--border)',
      boxShadow: foc ? '0 0 0 3px ' + (error ? 'rgba(220,38,38,.15)' : 'rgba(18,49,94,.15)') : 'none',
      opacity: disabled ? .55 : 1,
      ...style
    },
    ...rest
  });
}
function Textarea({
  error,
  disabled,
  rows = 4,
  style,
  ...rest
}) {
  const [foc, setFoc] = React.useState(false);
  return React.createElement('textarea', {
    disabled,
    rows,
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    'aria-invalid': error ? 'true' : undefined,
    style: {
      ...fieldBase,
      height: 'auto',
      padding: '10px 14px',
      resize: 'vertical',
      lineHeight: 1.5,
      borderColor: error ? 'var(--destructive)' : foc ? 'var(--ring)' : 'var(--border)',
      boxShadow: foc ? '0 0 0 3px ' + (error ? 'rgba(220,38,38,.15)' : 'rgba(18,49,94,.15)') : 'none',
      opacity: disabled ? .55 : 1,
      ...style
    },
    ...rest
  });
}
function Select({
  options = [],
  placeholder,
  error,
  disabled,
  style,
  ...rest
}) {
  const [foc, setFoc] = React.useState(false);
  return React.createElement('select', {
    disabled,
    onFocus: () => setFoc(true),
    onBlur: () => setFoc(false),
    'aria-invalid': error ? 'true' : undefined,
    style: {
      ...fieldBase,
      appearance: 'auto',
      cursor: disabled ? 'not-allowed' : 'pointer',
      borderColor: error ? 'var(--destructive)' : foc ? 'var(--ring)' : 'var(--border)',
      boxShadow: foc ? '0 0 0 3px rgba(18,49,94,.15)' : 'none',
      opacity: disabled ? .55 : 1,
      ...style
    },
    ...rest
  }, placeholder && React.createElement('option', {
    value: ''
  }, placeholder), options.map(o => typeof o === 'string' ? React.createElement('option', {
    key: o,
    value: o
  }, o) : React.createElement('option', {
    key: o.value,
    value: o.value
  }, o.label)));
}
function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  style
}) {
  return React.createElement('label', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .55 : 1,
      fontSize: '.9375rem',
      ...style
    }
  }, React.createElement('input', {
    type: 'checkbox',
    checked,
    disabled,
    onChange: e => onChange && onChange(e.target.checked),
    style: {
      width: 18,
      height: 18,
      accentColor: 'var(--primary)',
      cursor: 'inherit'
    }
  }), label);
}
Object.assign(__ds_scope, { Field, Input, Textarea, Select, Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/map/MapMarker.jsx
try { (() => {
function MapMarker({
  state = 'default',
  count,
  style
}) {
  if (state === 'cluster') return React.createElement('div', {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--navy-600)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '.8125rem',
      border: '2px solid #fff',
      boxShadow: 'var(--shadow-md)',
      ...style
    }
  }, count);
  const sel = state === 'selected',
    hov = state === 'hover';
  const c = sel ? 'var(--cta)' : 'var(--navy-600)';
  return React.createElement('div', {
    style: {
      width: sel || hov ? 30 : 24,
      height: sel || hov ? 30 : 24,
      transition: 'all var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, React.createElement('svg', {
    viewBox: '0 0 24 24',
    width: '100%',
    height: '100%'
  }, React.createElement('path', {
    d: 'M12 2C7.6 2 4 5.6 4 10c0 5.4 8 12 8 12s8-6.6 8-12c0-4.4-3.6-8-8-8z',
    fill: c,
    stroke: '#fff',
    strokeWidth: 1.5
  }), React.createElement('circle', {
    cx: 12,
    cy: 10,
    r: 3,
    fill: '#fff'
  })));
}
function MapPopup({
  name,
  price,
  score,
  reason,
  status = 'available',
  image,
  onDetail,
  onAdd,
  style
}) {
  return React.createElement('div', {
    style: {
      width: 260,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      ...style
    }
  }, React.createElement('div', {
    style: {
      height: 96,
      background: 'linear-gradient(160deg,var(--navy-100),var(--navy-300))',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--navy-600)',
      fontSize: '.6875rem',
      fontWeight: 600,
      letterSpacing: '.06em'
    }
  }, image ? React.createElement('img', {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : 'ẢNH VỊ TRÍ'), React.createElement('div', {
    style: {
      padding: '12px 14px',
      display: 'grid',
      gap: 8
    }
  }, React.createElement('div', {
    style: {
      fontWeight: 600,
      fontSize: '.9375rem',
      lineHeight: 1.3
    }
  }, name), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, price && React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600,
      fontSize: '.875rem',
      color: 'var(--primary)'
    }
  }, price), score != null && React.createElement(__ds_scope.AIScoreBadge, {
    score,
    reason,
    size: 'sm'
  }), React.createElement(__ds_scope.StatusPill, {
    status
  })), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement('button', {
    onClick: onDetail,
    style: {
      flex: 1,
      height: 34,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      background: '#fff',
      color: 'var(--primary)',
      fontWeight: 600,
      fontSize: '.8125rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, 'Chi tiết'), React.createElement('button', {
    onClick: onAdd,
    style: {
      flex: 1.4,
      height: 34,
      borderRadius: 'var(--radius-md)',
      border: 'none',
      background: 'var(--cta)',
      color: 'var(--cta-foreground)',
      fontWeight: 600,
      fontSize: '.8125rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, '+ Thêm báo giá'))));
}
Object.assign(__ds_scope, { MapMarker, MapPopup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/map/MapMarker.jsx", error: String((e && e.message) || e) }); }

// components/quote/QuoteTray.jsx
try { (() => {
function QuoteTray({
  count = 0,
  total,
  onSubmit,
  onOpen,
  fixed = false,
  style
}) {
  if (!count) return null;
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      padding: '14px 24px',
      background: 'var(--navy-900)',
      color: '#fff',
      boxShadow: 'var(--shadow-xl)',
      ...(fixed ? {
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50
      } : {
        borderRadius: 'var(--radius-lg)'
      }),
      ...style
    }
  }, React.createElement('span', {
    onClick: onOpen,
    style: {
      fontWeight: 600,
      cursor: onOpen ? 'pointer' : 'default'
    }
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700
    }
  }, count), ' vị trí đã chọn'), total && React.createElement('span', {
    style: {
      color: 'var(--slate-300)',
      fontSize: '.9375rem'
    }
  }, 'Tạm tính: ', React.createElement('strong', {
    style: {
      fontFamily: 'var(--font-mono)',
      color: '#fff'
    }
  }, total)), React.createElement('span', {
    style: {
      flex: 1
    }
  }), React.createElement(__ds_scope.Button, {
    variant: 'cta',
    onClick: onSubmit
  }, 'Tạo báo giá →'));
}
Object.assign(__ds_scope, { QuoteTray });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/quote/QuoteTray.jsx", error: String((e && e.message) || e) }); }

// components/sections/TrustStats.jsx
try { (() => {
function TrustStats({
  stats = [],
  inverse = false,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '32px 64px',
      justifyContent: 'center',
      ...style
    }
  }, stats.map((s, i) => React.createElement('div', {
    key: i,
    style: {
      display: 'grid',
      gap: 4,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.1,
      color: inverse ? '#fff' : 'var(--primary)'
    }
  }, s.value), React.createElement('div', {
    style: {
      fontSize: 'var(--text-caption)',
      fontWeight: 600,
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: inverse ? 'var(--slate-300)' : 'var(--muted-foreground)'
    }
  }, s.label), s.note && React.createElement('div', {
    style: {
      fontSize: '.75rem',
      color: inverse ? 'var(--slate-400)' : 'var(--slate-400)'
    }
  }, s.note))));
}
Object.assign(__ds_scope, { TrustStats });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/TrustStats.jsx", error: String((e && e.message) || e) }); }

// sections2.jsx
try { (() => {
const NS2 = window.ToNCUADVDesignSystem_ce468e || {};
const {
  Button,
  FilterBar,
  FilterChip,
  Select,
  LocationCard,
  CaseStudyCard,
  Field,
  Input,
  Textarea,
  Checkbox,
  MapMarker,
  MapPopup,
  StatusPill,
  AIScoreBadge,
  Toast,
  QuoteTray
} = NS2;
const D2 = window.TCG_DATA;
const ESRI_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const OSM_TILES = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png';
function statusPillStyle(st) {
  const c = st === 'booked' ? {
    bg: 'rgba(244,114,182,.18)',
    fg: '#F472B6',
    label: 'Đã thuê'
  } : st === 'soon' ? {
    bg: 'rgba(245,158,11,.18)',
    fg: '#F59E0B',
    label: 'Sắp hết'
  } : {
    bg: 'rgba(45,212,191,.16)',
    fg: '#2DD4BF',
    label: 'Còn trống'
  };
  return c;
}
function MapSection({
  onAdd,
  hideHead
}) {
  const locs = D2.locations;
  const mapEl = React.useRef(null);
  const mapRef = React.useRef(null);
  const onAddRef = React.useRef(onAdd);
  onAddRef.current = onAdd;
  const [sel, setSel] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [baseMap, setBaseMap] = React.useState('satellite');
  const switchBase = mode => {
    setBaseMap(mode);
    const map = mapRef.current;
    if (!map) return;
    map.setLayoutProperty('esri', 'visibility', mode === 'satellite' ? 'visible' : 'none');
    map.setLayoutProperty('osm', 'visibility', mode === 'street' ? 'visible' : 'none');
  };
  const openPopup = (map, l) => {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-sans);display:grid;gap:8px;width:230px';
    el.innerHTML = '<img src="' + l.img + '" alt="" style="width:100%;height:110px;object-fit:cover;border-radius:2px"/>' + '<strong style="font-size:14px;line-height:1.35">' + l.name + '</strong>' + '<span style="font-family:var(--font-mono);font-size:13px;color:var(--primary);font-weight:600">' + D2.fmt(l.priceN) + '</span>';
    const pill = statusPillStyle(l.status);
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;align-items:center';
    row.innerHTML = '<span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;background:' + pill.bg + ';color:' + (l.status === 'available' ? '#0F766E' : l.status === 'soon' ? '#92400E' : '#9D174D') + '">' + pill.label + '</span>';
    if (l.status !== 'booked') {
      const btn = document.createElement('button');
      btn.textContent = '+ Thêm báo giá';
      btn.style.cssText = 'flex:1;height:32px;border:none;border-radius:2px;background:var(--cta);color:#fff;font-weight:600;font-size:12.5px;font-family:var(--font-sans);cursor:pointer';
      btn.onclick = () => onAddRef.current && onAddRef.current(l);
      row.appendChild(btn);
    }
    el.appendChild(row);
    new window.maplibregl.Popup({
      offset: 14,
      maxWidth: '260px',
      closeOnClick: false
    }).setLngLat([l.lng, l.lat]).setDOMContent(el).addTo(map);
  };
  React.useEffect(() => {
    if (!window.maplibregl || !mapEl.current) return;
    const map = new window.maplibregl.Map({
      container: mapEl.current,
      style: {
        version: 8,
        sources: {
          esri: {
            type: 'raster',
            tiles: [ESRI_TILES],
            tileSize: 256,
            attribution: 'Tiles © Esri | Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          },
          osm: {
            type: 'raster',
            tiles: [OSM_TILES],
            tileSize: 512,
            attribution: '© OpenStreetMap contributors © CARTO'
          }
        },
        layers: [{
          id: 'esri',
          type: 'raster',
          source: 'esri'
        }, {
          id: 'osm',
          type: 'raster',
          source: 'osm',
          layout: {
            visibility: 'none'
          }
        }]
      },
      center: [105.845, 21.02],
      zoom: 10.4,
      attributionControl: {
        compact: false
      }
    });
    mapRef.current = map;
    map.addControl(new window.maplibregl.NavigationControl({
      showCompass: false
    }), 'bottom-right');
    map.addControl(new window.maplibregl.ScaleControl({
      maxWidth: 110
    }), 'bottom-left');
    D2.clusters.forEach(([lng, lat, count]) => {
      const el = document.createElement('div');
      const big = count >= 25;
      el.style.cssText = 'width:' + (big ? 38 : 30) + 'px;height:' + (big ? 38 : 30) + 'px;border-radius:50%;display:grid;place-items:center;font:600 ' + (big ? 14 : 12.5) + 'px var(--font-mono);color:#053B34;background:' + (big ? '#F5A524' : '#2DD4BF') + ';border:2.5px solid rgba(255,255,255,.92);box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer';
      if (big) el.style.color = '#4A2A00';
      el.textContent = count;
      el.title = count + ' vị trí trong khu vực';
      el.onclick = e => {
        e.stopPropagation();
        map.flyTo({
          center: [lng, lat],
          zoom: 12.5,
          essential: true
        });
      };
      new window.maplibregl.Marker({
        element: el
      }).setLngLat([lng, lat]).addTo(map);
    });
    locs.forEach((l, i) => {
      const el = document.createElement('div');
      el.style.cssText = 'width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:var(--blue-500);border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.4);color:#fff;font-size:13px;cursor:pointer';
      el.textContent = '★';
      el.title = l.name;
      el.onclick = e => {
        e.stopPropagation();
        setSel(i);
        map.flyTo({
          center: [l.lng, l.lat],
          zoom: 12.8,
          essential: true
        });
        openPopup(map, l);
      };
      new window.maplibregl.Marker({
        element: el
      }).setLngLat([l.lng, l.lat]).addTo(map);
    });
    setReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  const focus = i => {
    setSel(i);
    const map = mapRef.current,
      l = locs[i];
    if (map) {
      map.flyTo({
        center: [l.lng, l.lat],
        zoom: l.city === 'Hà Nội' ? 12.8 : 11.5,
        essential: true
      });
      openPopup(map, l);
    }
  };
  const legendDot = (c, label) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: '.75rem',
      color: '#E2E8F0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: c
    }
  }), label);
  return /*#__PURE__*/React.createElement("section", {
    id: "map",
    style: {
      background: 'var(--muted)',
      padding: hideHead ? '0' : '88px 0 0'
    }
  }, !hideHead && /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "B\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED OOH to\xE0n qu\u1ED1c",
    sub: "L\u1ECDc theo t\u1EC9nh/th\xE0nh, lo\u1EA1i bi\u1EC3n, ng\xE2n s\xE1ch, ch\u1ECDn v\u1ECB tr\xED \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      height: hideHead ? 'calc(100vh - 72px)' : 600,
      minHeight: 520
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--slate-900)',
      color: '#F1F5F9',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid rgba(255,255,255,.1)',
      fontSize: '.8125rem',
      color: 'var(--slate-400)'
    }
  }, "Hi\u1EC3n th\u1ECB ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: '#fff'
    }
  }, locs.length, "/2.008"), " k\u1EBFt qu\u1EA3. Thu h\u1EB9p b\u1ED9 l\u1ECDc \u0111\u1EC3 ch\xEDnh x\xE1c h\u01A1n."), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      minHeight: 0
    },
    "data-comment-anchor": "4e83c32b02-div-92-9"
  }, locs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    onClick: () => focus(i),
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,.07)',
      background: sel === i ? 'rgba(54,143,255,.14)' : 'transparent',
      borderLeft: sel === i ? '3px solid var(--blue-400)' : '3px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.img,
    alt: "",
    style: {
      width: 56,
      height: 42,
      objectFit: 'cover',
      borderRadius: 2,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      alignContent: 'start',
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.875rem',
      lineHeight: 1.3
    }
  }, "\u2605 ", l.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--slate-400)'
    }
  }, l.type, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, l.size)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, (() => {
    const p = statusPillStyle(l.status);
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '.6875rem',
        fontWeight: 600,
        padding: '2px 9px',
        borderRadius: 'var(--radius-full)',
        background: p.bg,
        color: p.fg
      }
    }, p.label);
  })(), l.status !== 'booked' && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd(l);
    },
    style: {
      marginLeft: 'auto',
      height: 26,
      padding: '0 10px',
      border: '1px solid rgba(255,255,255,.25)',
      borderRadius: 2,
      background: 'transparent',
      color: '#BFDBFE',
      fontSize: '.6875rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, "+ B\xE1o gi\xE1"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: mapEl,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), !window.maplibregl && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--slate-100)',
      color: 'var(--muted-foreground)',
      fontSize: '.875rem'
    }
  }, "Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c MapLibre GL. Ki\u1EC3m tra k\u1EBFt n\u1ED1i r\u1ED3i t\u1EA3i l\u1EA1i trang."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 5,
      display: 'flex',
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid rgba(255,255,255,.25)'
    }
  }, [['satellite', 'Vệ tinh'], ['street', 'Bản đồ']].map(([m, l]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => switchBase(m),
    style: {
      height: 36,
      padding: '0 16px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: '.8125rem',
      fontWeight: 600,
      background: baseMap === m ? 'var(--primary)' : 'rgba(15,23,42,.85)',
      color: baseMap === m ? '#fff' : '#CBD5E1'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      zIndex: 5,
      background: 'rgba(15,23,42,.88)',
      borderRadius: 4,
      padding: '10px 14px',
      display: 'grid',
      gap: 8,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, legendDot('#2DD4BF', 'Còn trống'), legendDot('#F472B6', 'Đã cho thuê')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, legendDot('#2DD4BF', 'Cụm vị trí'), legendDot('#F5A524', 'Cụm lớn ≥25'), legendDot('var(--blue-500)', '★ Vị trí tiêu biểu'))))));
}
function Process() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "Ho\u1EA1t \u0111\u1ED9ng th\u1EBF n\xE0o? T\u1EF1 ph\u1EE5c v\u1EE5 24/7",
    sub: "Nh\u1EADn b\xE1o gi\xE1 PDF trong v\xE0i ph\xFAt, kh\xF4ng c\u1EA7n ch\u1EDD sales."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 26,
      left: '10%',
      right: '10%',
      height: 2,
      background: 'var(--border)'
    }
  }), D2.steps.map(([ic, label], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 12,
      justifyItems: 'center',
      textAlign: 'center',
      position: 'relative',
      padding: '0 10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      background: i === 3 ? 'var(--cta)' : 'var(--primary)',
      color: i === 3 ? 'var(--cta-foreground)' : '#fff',
      display: 'grid',
      placeItems: 'center',
      border: '4px solid #fff',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: ic,
    size: 22,
    color: "currentColor"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9375rem',
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, label))))));
}
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      background: 'var(--muted)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "Gi\u1EA3i ph\xE1p OOH c\u1EE7a To\xE0n C\u1EA7u"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, D2.services.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: "svc",
    style: {
      display: 'grid',
      gap: 10,
      alignContent: 'start',
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 20px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--navy-50)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 600
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.875rem',
      color: 'var(--muted-foreground)',
      lineHeight: 1.55
    }
  }, s.desc), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: 'var(--primary)',
      cursor: 'pointer'
    }
  }, "T\xECm hi\u1EC3u \u2192"))))));
}
function Cases() {
  return /*#__PURE__*/React.createElement("section", {
    id: "cases",
    style: {
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "D\u1EF1 \xE1n & chi\u1EBFn d\u1ECBch ti\xEAu bi\u1EC3u",
    sub: "N\u1ED9i dung m\u1EABu, ch\u1EDD case study th\u1EADt t\u1EEB Content/Sales."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, D2.cases.map(c => /*#__PURE__*/React.createElement(CaseStudyCard, {
    key: c.brand,
    brand: c.brand,
    image: c.img,
    industry: c.industry,
    result: c.result,
    onDetail: () => {}
  })))));
}
function LeadForm({
  onToast
}) {
  const [st, setSt] = React.useState('idle');
  const [ok, setOk] = React.useState(false);
  const submit = () => {
    setSt('submitting');
    setTimeout(() => {
      setSt('success');
      onToast({
        kind: 'success',
        title: 'Đã gửi yêu cầu tư vấn',
        message: 'Đội ngũ Toàn Cầu sẽ liên hệ trong 24h.'
      });
    }, 1200);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "lead",
    style: {
      background: 'var(--navy-50)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: '.9fr 1.1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.18
    }
  }, "Nh\u1EADn t\u01B0 v\u1EA5n OOH mi\u1EC5n ph\xED"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--slate-600)'
    }
  }, "\u0110\u1EC3 l\u1EA1i th\xF4ng tin, \u0111\u1ED9i ng\u0169 To\xE0n C\u1EA7u li\xEAn h\u1EC7 trong 24h."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 10
    }
  }, ['Tư vấn vị trí theo ngành hàng', 'Báo giá PDF nhanh', '20 năm kinh nghiệm OOH'].map(x => /*#__PURE__*/React.createElement("li", {
    key: x,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      fontWeight: 700
    }
  }, "\u2713"), x)))), st === 'success' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 40,
      display: 'grid',
      gap: 10,
      justifyItems: 'center',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--success)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: 26,
      fontWeight: 700
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-h3)'
    }
  }, "\u0110\xE3 nh\u1EADn y\xEAu c\u1EA7u c\u1EE7a b\u1EA1n"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)'
    }
  }, "Ch\xFAng t\xF4i s\u1EBD li\xEAn h\u1EC7 trong 24h l\xE0m vi\u1EC7c. M\xE3 y\xEAu c\u1EA7u: ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600
    }
  }, "TC-2607-018")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setSt('idle')
  }, "G\u1EEDi y\xEAu c\u1EA7u kh\xE1c")) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 28,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "H\u1ECD t\xEAn",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Nguy\u1EC5n V\u0103n A"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "09xx xxx xxx"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Doanh nghi\u1EC7p"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "T\xEAn c\xF4ng ty"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "ban@congty.vn"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ng\xE0nh h\xE0ng"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Ch\u1ECDn ng\xE0nh h\xE0ng",
    options: ['F&B', 'Thời trang & Phụ kiện', 'Mỹ phẩm & Chăm sóc cá nhân', 'Đồ gia dụng & Trang trí', 'Công nghệ & Điện tử']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ng\xE2n s\xE1ch"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Ch\u1ECDn kho\u1EA3ng",
    options: ['< 50 triệu/tháng', '50-150 triệu/tháng', '> 150 triệu/tháng']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nhu c\u1EA7u / ghi ch\xFA"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "M\xF4 t\u1EA3 ng\u1EAFn nhu c\u1EA7u qu\u1EA3ng c\xE1o\u2026"
  }))), /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u0110\u1ED3ng \xFD nh\u1EADn li\xEAn h\u1EC7",
    checked: ok,
    onChange: setOk
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    loading: st === 'submitting',
    disabled: !ok,
    onClick: submit
  }, st === 'submitting' ? 'Đang gửi…' : 'Gửi yêu cầu tư vấn')))));
}
function CTABand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--navy-800)',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 20,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      textWrap: 'balance'
    }
  }, "S\u1EB5n s\xE0ng t\xECm v\u1ECB tr\xED OOH cho chi\u1EBFn d\u1ECBch ti\u1EBFp theo?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    size: "lg",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    size: "lg",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Y\xEAu c\u1EA7u b\xE1o gi\xE1")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      color: 'var(--slate-400)'
    }
  }, "B\u1EA1n l\xE0 ch\u1EE7 bi\u1EC3n mu\u1ED1n cho thu\xEA? S\xE0n OOH s\u1EAFp ra m\u1EAFt.")));
}
const socialCircle = {
  width: 36,
  height: 36,
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--border)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--primary)',
  cursor: 'pointer'
};
function Footer() {
  const info = (label, val) => /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      lineHeight: 1.7,
      color: 'var(--slate-700)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--foreground)'
    }
  }, label, ":"), " ", val);
  const col = (t, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1rem',
      color: 'var(--foreground)'
    }
  }, t), items.map((x, i) => typeof x === 'string' ? /*#__PURE__*/React.createElement("a", {
    key: i,
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, x) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem'
    }
  }, x[0]), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.0625rem',
      color: 'var(--foreground)'
    }
  }, x[1]))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: '#fff',
      borderTop: '1px solid var(--border)',
      padding: '56px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/v1-assets/assets/logo-full.png",
    alt: "To\xE0n C\u1EA7u ADV",
    style: {
      height: 52
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1.0625rem'
    }
  }, "C\xF4ng Ty C\u1ED5 Ph\u1EA7n T\u1EADp \u0110o\xE0n Qu\u1EA3ng C\xE1o To\xE0n C\u1EA7u"), info('Trụ sở chính', '265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội, Việt Nam'), info('Hotline', '024 3929 0088'), info('Email', 'info@toancauadv.vn'), info('Thời gian làm việc', 'Giờ hành chính từ thứ 2 đến sáng thứ 7'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9375rem',
      color: 'var(--slate-700)',
      marginTop: 6
    }
  }, "Theo d\xF5i ch\xFAng t\xF4i qua:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "Facebook"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "YouTube"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "Zalo / \u0111i\u1EC7n tho\u1EA1i"
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "phone",
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 280,
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'linear-gradient(150deg,#E8F0FA,#DCE8F5 55%,#D2E1F0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(35,116,217,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(35,116,217,.07) 1px,transparent 1px)',
      backgroundSize: '40px 40px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '52%',
      top: '44%',
      transform: 'translate(-50%,-100%)'
    }
  }, /*#__PURE__*/React.createElement(NS2.MapMarker, {
    state: "selected"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      top: 12,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      padding: '10px 14px',
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.875rem'
    }
  }, "265 Th\u1EE5y Khu\xEA, T\xE2y H\u1ED3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, "Tr\u1EE5 s\u1EDF To\xE0n C\u1EA7u ADV, H\xE0 N\u1ED9i")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      bottom: 8,
      fontSize: '.6875rem',
      color: 'var(--slate-500)'
    }
  }, "B\u1EA3n \u0111\u1ED3 minh ho\u1EA1. Production: nh\xFAng Google Maps."))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 32,
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 32
    }
  }, col('Doanh nghiệp', ['Về Toàn Cầu', 'Khách hàng', 'Tin tức', 'Tuyển dụng', 'Liên hệ']), col('Dịch vụ', ['Quảng cáo sân bay', 'Billboard · Pano', 'Màn hình LED', 'Nhà chờ xe bus']), col('Vị trí OOH', ['Bản đồ vị trí', 'Theo tỉnh/thành', 'Vị trí còn trống']), col('Hotline', [['Tư vấn quảng cáo', '024 3929 0088'], ['Chăm sóc khách hàng', '1900 6522']])), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 18,
      display: 'flex',
      gap: 16,
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 C\xF4ng ty C\u1ED5 ph\u1EA7n T\u1EADp \u0111o\xE0n Qu\u1EA3ng c\xE1o To\xE0n C\u1EA7u"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, "Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt"), /*#__PURE__*/React.createElement("span", null, "\u0110i\u1EC1u kho\u1EA3n"))));
}
Object.assign(window, {
  MapSection,
  Process,
  Services,
  Cases,
  LeadForm,
  CTABand,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "sections2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app-about.jsx
try { (() => {
const NSAB = window.ToNCUADVDesignSystem_ce468e;
const {
  Button
} = NSAB || {};
const D = window.TCG_DATA;
const STATS = [['DẪN ĐẦU', 'Mạng lưới', 'Sở hữu và khai thác mạng lưới vị trí quảng cáo ngoài trời rộng trên toàn quốc, không chỉ tại sân bay.'], ['20+', 'năm hoạt động', 'Thành lập từ 2003, hơn 20 năm kinh nghiệm trong ngành quảng cáo và truyền thông tại Việt Nam.'], ['~730', 'vị trí OOH', 'Mặt biển quảng cáo tại hệ thống sân bay và các vị trí liên quan trên toàn quốc.'], ['89.000', 'm² khai thác', 'Diện tích quảng cáo đang và đã được khai thác trong toàn bộ lịch sử hoạt động.'], ['400+', 'nhãn hàng', 'Đã từng hợp tác trong toàn bộ lịch sử hoạt động, thuộc nhiều lĩnh vực khác nhau.'], ['5', 'khu vực', 'Hiện diện tại Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ và Nghệ An.']];
function App() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      color: '#fff',
      overflow: 'hidden',
      background: 'var(--blue-900)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/v1-assets/assets/ooh/phapvan-57a.png",
    alt: "To\xE0n C\u1EA7u ADV",
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '55%',
      height: '100%',
      objectFit: 'cover',
      opacity: .9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg,var(--blue-900) 0%,var(--blue-900) 42%,rgba(13,47,94,.7) 56%,rgba(13,47,94,0) 74%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      ...window.container,
      padding: '88px 32px 72px',
      display: 'grid',
      gap: 16,
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--blue-200)'
    }
  }, "V\u1EC1 ch\xFAng t\xF4i"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '4rem',
      lineHeight: 1,
      color: '#fff'
    }
  }, "20+"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9375rem',
      color: 'var(--blue-100)',
      maxWidth: 220,
      lineHeight: 1.4
    }
  }, "n\u0103m kinh nghi\u1EC7m qu\u1EA3ng c\xE1o ngo\xE0i tr\u1EDDi t\u1EA1i Vi\u1EC7t Nam, t\u1EEB 2003 \u0111\u1EBFn nay")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2rem,3.2vw,2.75rem)',
      fontWeight: 600,
      lineHeight: 1.2,
      textWrap: 'balance'
    }
  }, "Doanh nghi\u1EC7p qu\u1EA3ng c\xE1o ngo\xE0i tr\u1EDDi l\xE2u n\u0103m t\u1EA1i Vi\u1EC7t Nam"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.65,
      color: 'var(--slate-200)'
    }
  }, "To\xE0n C\u1EA7u ADV l\xE0 doanh nghi\u1EC7p qu\u1EA3ng c\xE1o ngo\xE0i tr\u1EDDi c\xF3 h\u01A1n 20 n\u0103m kinh nghi\u1EC7m, s\u1EDF h\u1EEFu v\xE0 khai th\xE1c m\u1EA1ng l\u01B0\u1EDBi bi\u1EC3n qu\u1EA3ng c\xE1o \u0111a d\u1EA1ng tr\xEAn to\xE0n qu\u1ED1c, v\u1EDBi th\u1EBF m\u1EA1nh trong billboard, pano, s\xE2n bay, nh\xE0 ch\u1EDD v\xE0 c\xE1c v\u1ECB tr\xED OOH l\u01B0u l\u01B0\u1EE3ng cao."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      lineHeight: 1.65,
      color: 'var(--slate-300)'
    }
  }, "C\xF4ng ty \u0111ang chuy\u1EC3n \u0111\u1ED5i theo h\u01B0\u1EDBng hi\u1EC7n \u0111\u1EA1i h\xF3a ho\u1EA1t \u0111\u1ED9ng t\u01B0 v\u1EA5n, s\u1ED1 h\xF3a d\u1EEF li\u1EC7u v\u1ECB tr\xED v\xE0 m\u1EDF r\u1ED9ng sang marketing online nh\u1EB1m mang \u0111\u1EBFn gi\u1EA3i ph\xE1p truy\u1EC1n th\xF4ng hi\u1EC7u qu\u1EA3, chuy\xEAn nghi\u1EC7p v\xE0 ph\xF9 h\u1EE3p h\u01A1n cho t\u1EEBng ng\xE0nh h\xE0ng."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "services.html",
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: '#fff',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid rgba(255,255,255,.35)'
    }
  }, "D\u1ECBch v\u1EE5 To\xE0n C\u1EA7u ADV \u2192"), /*#__PURE__*/React.createElement("a", {
    href: "map.html",
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: '#fff',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid rgba(255,255,255,.35)'
    }
  }, "M\u1EA1ng l\u01B0\u1EDBi v\u1ECB tr\xED OOH \u2192")))), /*#__PURE__*/React.createElement(window.Journey, null), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    kicker: "Theo th\xF4ng tin doanh nghi\u1EC7p cung c\u1EA5p",
    title: "To\xE0n C\u1EA7u ADV theo con s\u1ED1",
    sub: "C\xE1c ch\u1EC9 s\u1ED1 quy m\xF4 d\xF9ng l\xE0m th\xF4ng tin n\u1EC1n, kh\xF4ng ph\u1EA3i tuy\xEAn b\u1ED1 ph\xE1p l\xFD hay cam k\u1EBFt th\u01B0\u01A1ng m\u1EA1i."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '32px 24px'
    }
  }, STATS.map(([kicker, unit, desc], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 8,
      borderTop: '2px solid var(--primary)',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 700,
      letterSpacing: '.08em',
      color: 'var(--slate-500)'
    }
  }, kicker.match(/^[A-ZÀ-Ỹ ]+$/) ? kicker : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '2rem',
      color: 'var(--primary)',
      lineHeight: 1
    }
  }, kicker.match(/^[A-ZÀ-Ỹ ]+$/) ? '' : kicker), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9375rem',
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, unit)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      lineHeight: 1.55
    }
  }, desc)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--muted)',
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "L\u0129nh v\u1EF1c ho\u1EA1t \u0111\u1ED9ng ch\xEDnh",
    sub: "T\u1EEB bi\u1EC3n qu\u1EA3ng c\xE1o t\u1EA5m l\u1EDBn \u0111\u1EBFn t\u01B0 v\u1EA5n, thi\u1EBFt k\u1EBF v\xE0 tri\u1EC3n khai chi\u1EBFn d\u1ECBch qu\u1EA3ng c\xE1o th\u1EF1c t\u1EBF."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, D.capabilities.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.label,
    style: {
      display: 'grid',
      gap: 10,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 18px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-md)',
      background: 'var(--blue-50)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: c.icon,
    size: 19
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, c.label)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '80px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "V\u0103n ph\xF2ng \u0111\u1EA1i di\u1EC7n",
    sub: "Hi\u1EC7n di\u1EC7n t\u1EA1i nhi\u1EC1u khu v\u1EF1c tr\u1ECDng \u0111i\u1EC3m tr\xEAn to\xE0n qu\u1ED1c."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 14
    }
  }, D.offices.map(o => /*#__PURE__*/React.createElement("div", {
    key: o.city,
    style: {
      display: 'grid',
      gap: 6,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 16px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "map-pin",
    size: 18,
    color: "var(--primary)"
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.9375rem'
    }
  }, o.city), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, o.role), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      lineHeight: 1.5
    }
  }, o.addr)))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 0 88px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      background: 'var(--blue-50)',
      borderRadius: 'var(--radius-xl)',
      padding: '40px 44px',
      borderLeft: '4px solid var(--primary)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.375rem',
      fontWeight: 500,
      lineHeight: 1.55,
      color: 'var(--foreground)',
      fontStyle: 'italic'
    }
  }, "\u201CTo\xE0n C\u1EA7u ADV l\xE0 doanh nghi\u1EC7p qu\u1EA3ng c\xE1o ngo\xE0i tr\u1EDDi c\xF3 h\u01A1n 20 n\u0103m kinh nghi\u1EC7m, s\u1EDF h\u1EEFu v\xE0 khai th\xE1c m\u1EA1ng l\u01B0\u1EDBi bi\u1EC3n qu\u1EA3ng c\xE1o \u0111a d\u1EA1ng tr\xEAn to\xE0n qu\u1ED1c, v\u1EDBi th\u1EBF m\u1EA1nh trong billboard, pano, s\xE2n bay, nh\xE0 ch\u1EDD v\xE0 c\xE1c v\u1ECB tr\xED OOH l\u01B0u l\u01B0\u1EE3ng cao.\u201D"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      marginTop: 14,
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)'
    }
  }, "\u2014 \u0110\u1ECBnh v\u1ECB th\u01B0\u01A1ng hi\u1EC7u \u0111\u1EC1 xu\u1EA5t, To\xE0n C\u1EA7u ADV"))), /*#__PURE__*/React.createElement(window.CTABand, null), /*#__PURE__*/React.createElement(window.Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSAB ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app-about.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app-contact.jsx
try { (() => {
const NSC = window.ToNCUADVDesignSystem_ce468e;
function PageHead({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h1)',
      fontWeight: 600,
      lineHeight: 1.12
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--blue-100)',
      maxWidth: 640
    }
  }, sub)));
}
function App() {
  const [toast, setToast] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement(PageHead, {
    title: "Li\xEAn h\u1EC7 To\xE0n C\u1EA7u ADV",
    sub: "\u0110\u1ED9i ng\u0169 t\u01B0 v\u1EA5n li\xEAn h\u1EC7 l\u1EA1i trong 24h l\xE0m vi\u1EC7c."
  }), /*#__PURE__*/React.createElement(window.LeadForm, {
    onToast: t => {
      setToast(t);
      setTimeout(() => setToast(null), 3200);
    }
  }), /*#__PURE__*/React.createElement(window.Footer, null), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 88,
      right: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(NSC.Toast, {
    kind: toast.kind,
    title: toast.title,
    message: toast.message,
    onClose: () => setToast(null)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSC && NSC.Toast ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app-contact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app-map.jsx
try { (() => {
const NSM = window.ToNCUADVDesignSystem_ce468e;
function PageHead({
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h1)',
      fontWeight: 600,
      lineHeight: 1.12
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '12px 0 0',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--blue-100)',
      maxWidth: 640
    }
  }, sub)));
}
function App() {
  const [cart, setCart] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const add = l => {
    setCart(c => c.some(x => x.id === l.id) ? c : [...c, l]);
    setToast({
      kind: 'success',
      title: 'Đã thêm vào báo giá',
      message: l.name
    });
    setTimeout(() => setToast(null), 2600);
  };
  const total = cart.reduce((s, l) => s + l.priceN, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement(window.MapSection, {
    onAdd: add,
    hideHead: true
  }), /*#__PURE__*/React.createElement(window.Footer, null), /*#__PURE__*/React.createElement(NSM.QuoteTray, {
    fixed: true,
    count: cart.length,
    total: total ? window.TCG_DATA.fmt(total) : null,
    onSubmit: () => {
      setToast({
        kind: 'success',
        title: 'Báo giá PDF nháp đang được tạo',
        message: cart.length + ' vị trí đã chọn'
      });
      setTimeout(() => setToast(null), 3000);
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 88,
      right: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(NSM.Toast, {
    kind: toast.kind,
    title: toast.title,
    message: toast.message,
    onClose: () => setToast(null)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSM && NSM.QuoteTray ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app-map.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app-news.jsx
try { (() => {
const NSN = window.ToNCUADVDesignSystem_ce468e;
const {
  Button
} = NSN || {};
function App() {
  const D = window.TCG_DATA;
  const [tag, setTag] = React.useState('Tất cả');
  const [page, setPage] = React.useState(1);
  const PER = 4;
  const all = D.news.filter(n => tag === 'Tất cả' || n.tag === tag);
  const pages = Math.max(1, Math.ceil(all.length / PER));
  const cur = Math.min(page, pages);
  const items = all.slice((cur - 1) * PER, cur * PER);
  const latest = [...D.news].slice(0, 4);
  const featured = D.news[1];
  const setTagAnd = t => {
    setTag(t);
    setPage(1);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '36px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--blue-200)'
    }
  }, "To\xE0n C\u1EA7u ADV"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.75rem',
      fontWeight: 600
    }
  }, "Tin t\u1EE9c")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, D.newsTags.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setTagAnd(t),
    style: {
      height: 34,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      border: tag === t ? '1px solid #fff' : '1px solid rgba(255,255,255,.3)',
      background: tag === t ? '#fff' : 'transparent',
      color: tag === t ? 'var(--blue-800)' : '#DBEAFE',
      fontSize: '.8125rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, t))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '48px 0 72px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: '7fr 3fr',
      gap: 40,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20,
      minWidth: 0
    }
  }, items.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--muted-foreground)'
    }
  }, "Ch\u01B0a c\xF3 b\xE0i vi\u1EBFt trong m\u1EE5c n\xE0y."), items.map((n, i) => /*#__PURE__*/React.createElement("article", {
    key: n.title,
    style: {
      display: 'grid',
      gridTemplateColumns: i === 0 ? '1fr' : '220px 1fr',
      gap: i === 0 ? 0 : 18,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: n.img,
    alt: "",
    style: {
      width: '100%',
      height: i === 0 ? 280 : '100%',
      minHeight: i === 0 ? 0 : 140,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: i === 0 ? '18px 22px 22px' : '16px 18px',
      display: 'grid',
      gap: 8,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.6875rem',
      fontWeight: 600,
      padding: '2px 10px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-50)',
      color: 'var(--blue-700)'
    }
  }, n.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, n.date)), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: i === 0 ? 'var(--text-h3)' : 'var(--text-h4)',
      fontWeight: 600,
      lineHeight: 1.35
    }
  }, n.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      color: 'var(--slate-600)',
      lineHeight: 1.6
    }
  }, n.excerpt), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: 'var(--primary)',
      cursor: 'pointer'
    }
  }, "\u0110\u1ECDc ti\u1EBFp \u2192")))), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Ph\xE2n trang",
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    disabled: cur === 1,
    onClick: () => setPage(cur - 1),
    style: {
      height: 38,
      padding: '0 14px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: '#fff',
      color: cur === 1 ? 'var(--slate-300)' : 'var(--primary)',
      fontWeight: 600,
      cursor: cur === 1 ? 'default' : 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "\u2190 Tr\u01B0\u1EDBc"), Array.from({
    length: pages
  }, (_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setPage(i + 1),
    style: {
      width: 38,
      height: 38,
      border: '1px solid ' + (cur === i + 1 ? 'var(--primary)' : 'var(--border)'),
      borderRadius: 'var(--radius-md)',
      background: cur === i + 1 ? 'var(--primary)' : '#fff',
      color: cur === i + 1 ? '#fff' : 'var(--slate-600)',
      fontWeight: 600,
      fontFamily: 'var(--font-mono)',
      cursor: 'pointer'
    }
  }, i + 1)), /*#__PURE__*/React.createElement("button", {
    disabled: cur === pages,
    onClick: () => setPage(cur + 1),
    style: {
      height: 38,
      padding: '0 14px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: '#fff',
      color: cur === pages ? 'var(--slate-300)' : 'var(--primary)',
      fontWeight: 600,
      cursor: cur === pages ? 'default' : 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, "Sau \u2192"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      display: 'grid',
      gap: 24,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--border)',
      fontWeight: 600
    }
  }, "B\xE0i vi\u1EBFt n\u1ED5i b\u1EADt"), /*#__PURE__*/React.createElement("img", {
    src: featured.img,
    alt: "",
    style: {
      width: '100%',
      height: 130,
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px 16px',
      display: 'grid',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.9375rem',
      lineHeight: 1.4
    }
  }, featured.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, featured.date))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      background: '#fff',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 16px',
      borderBottom: '1px solid var(--border)',
      fontWeight: 600
    }
  }, "M\u1EDBi nh\u1EA5t"), latest.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.title,
    style: {
      display: 'grid',
      gap: 2,
      padding: '12px 16px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: '.875rem',
      fontWeight: 500,
      lineHeight: 1.45,
      color: 'var(--foreground)',
      cursor: 'pointer'
    }
  }, n.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '.6875rem',
      color: 'var(--muted-foreground)'
    }
  }, n.date)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-lg)',
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '22px 20px',
      display: 'grid',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, "C\u1EA7n v\u1ECB tr\xED OOH cho chi\u1EBFn d\u1ECBch t\u1EDBi?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.875rem',
      color: 'var(--blue-100)',
      lineHeight: 1.6
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 ~730 v\u1ECB tr\xED v\xE0 nh\u1EADn b\xE1o gi\xE1 trong v\xE0i ph\xFAt."), /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Nh\u1EADn t\u01B0 v\u1EA5n"))))), /*#__PURE__*/React.createElement(window.Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSN ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app-news.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app-services.jsx
try { (() => {
const NSS = window.ToNCUADVDesignSystem_ce468e;
const {
  Button
} = NSS || {};
const svcImgs = {
  ['san-bay']: '/v1-assets/assets/ooh/noibai-41b.jpg',
  billboard: '/v1-assets/assets/ooh/phapvan-19a.png',
  led: '/v1-assets/assets/ooh/hanoi-cg01-nct.png',
  pano: '/v1-assets/assets/ooh/quangninh-hl16.jpg'
};
function App() {
  const D = window.TCG_DATA;
  const goSvc = slug => {
    const el = document.getElementById('svc-' + slug);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--blue-900)',
      color: '#fff',
      padding: '36px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--blue-200)'
    }
  }, "To\xE0n C\u1EA7u ADV"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: '1.75rem',
      fontWeight: 600
    }
  }, "D\u1ECBch v\u1EE5 qu\u1EA3ng c\xE1o ngo\xE0i tr\u1EDDi")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, D.services.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.slug,
    onClick: () => goSvc(s.slug),
    style: {
      height: 34,
      padding: '0 14px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid rgba(255,255,255,.3)',
      background: 'transparent',
      color: '#DBEAFE',
      fontSize: '.8125rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, s.name))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 48
    }
  }, D.services.map((s, i) => /*#__PURE__*/React.createElement("div", {
    id: 'svc-' + s.slug,
    key: s.slug,
    style: {
      display: 'grid',
      gridTemplateColumns: i % 2 ? '1fr 1.1fr' : '1.1fr 1fr',
      gap: 40,
      alignItems: 'center'
    }
  }, i % 2 === 0 && /*#__PURE__*/React.createElement("img", {
    src: svcImgs[s.slug],
    alt: s.name,
    style: {
      width: '100%',
      aspectRatio: '8/5',
      objectFit: 'cover',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14,
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--blue-50)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, s.name)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.65,
      color: 'var(--slate-600)',
      maxWidth: 520
    }
  }, s.desc), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 8
    }
  }, s.feats.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'baseline',
      fontSize: '.9375rem'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      fontWeight: 700
    }
  }, "\u2713"), f))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      padding: '12px 0',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, "Gi\xE1 tham kh\u1EA3o t\u1EEB"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.25rem',
      color: 'var(--primary)'
    }
  }, s.from, ".000.000\u0111", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      fontWeight: 400
    }
  }, "/th\xE1ng"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, "Quy m\xF4"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.25rem'
    }
  }, s.count))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Xem v\u1ECB tr\xED tr\xEAn b\u1EA3n \u0111\u1ED3"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Nh\u1EADn t\u01B0 v\u1EA5n & b\xE1o gi\xE1"))), i % 2 === 1 && /*#__PURE__*/React.createElement("img", {
    src: svcImgs[s.slug],
    alt: s.name,
    style: {
      width: '100%',
      aspectRatio: '8/5',
      objectFit: 'cover',
      borderRadius: 'var(--radius-xl)',
      border: '1px solid var(--border)'
    }
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--muted)',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)',
      textAlign: 'center'
    }
  }, "Quy tr\xECnh tri\u1EC3n khai"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5,1fr)',
      gap: 12
    }
  }, D.steps.map(([ic, label], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 10,
      justifyItems: 'center',
      textAlign: 'center',
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'var(--primary)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: ic,
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, label)))))), /*#__PURE__*/React.createElement(window.CTABand, null), /*#__PURE__*/React.createElement(window.Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSS && NSS.Button ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement("div", {
  style: {
    padding: 40
  }
}, "\u0110ang bi\xEAn d\u1ECBch design system\u2026 t\u1EA3i l\u1EA1i trang."));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app-services.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
const NSA = window.ToNCUADVDesignSystem_ce468e;
function MissingBundle() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '60vh',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1.25rem',
      color: 'var(--primary)'
    }
  }, "\u0110ang bi\xEAn d\u1ECBch design system\u2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)'
    }
  }, "_ds_bundle.js ch\u01B0a s\u1EB5n s\xE0ng. Vui l\xF2ng t\u1EA3i l\u1EA1i trang."), /*#__PURE__*/React.createElement("button", {
    onClick: () => location.reload(),
    style: {
      height: 44,
      padding: '0 20px',
      border: 'none',
      borderRadius: 8,
      background: 'var(--primary,#12315E)',
      color: '#fff',
      fontWeight: 600,
      fontFamily: 'inherit',
      cursor: 'pointer'
    }
  }, "T\u1EA3i l\u1EA1i")));
}
function App() {
  const [cart, setCart] = React.useState([]);
  const [toast, setToast] = React.useState(null);
  const add = l => {
    setCart(c => c.some(x => x.id === l.id) ? c : [...c, l]);
    setToast({
      kind: 'success',
      title: 'Đã thêm vào báo giá',
      message: l.name
    });
    setTimeout(() => setToast(null), 2600);
  };
  const total = cart.reduce((s, l) => s + l.priceN, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(window.Navbar, {
    onQuote: () => window.go('#lead')
  }), /*#__PURE__*/React.createElement(window.Hero, null), /*#__PURE__*/React.createElement(window.Stats, null), /*#__PURE__*/React.createElement(window.Spotlight, null), /*#__PURE__*/React.createElement(window.MapPreview, null), /*#__PURE__*/React.createElement(window.Journey, null), /*#__PURE__*/React.createElement(window.Cases, null), /*#__PURE__*/React.createElement(window.LeadForm, {
    onToast: t => {
      setToast(t);
      setTimeout(() => setToast(null), 3200);
    }
  }), /*#__PURE__*/React.createElement(window.CTABand, null), /*#__PURE__*/React.createElement(window.Footer, null), /*#__PURE__*/React.createElement(NSA.QuoteTray, {
    fixed: true,
    count: cart.length,
    total: total ? window.TCG_DATA.fmt(total) : null,
    onSubmit: () => {
      setToast({
        kind: 'success',
        title: 'Báo giá PDF nháp đang được tạo',
        message: cart.length + ' vị trí đã chọn'
      });
      setTimeout(() => setToast(null), 3000);
    }
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      top: 88,
      right: 24,
      zIndex: 60
    }
  }, /*#__PURE__*/React.createElement(NSA.Toast, {
    kind: toast.kind,
    title: toast.title,
    message: toast.message,
    onClose: () => setToast(null)
  })));
}
ReactDOM.createRoot(document.getElementById('root')).render(NSA && NSA.QuoteTray ? /*#__PURE__*/React.createElement(App, null) : /*#__PURE__*/React.createElement(MissingBundle, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.TCG_DATA = {
  industries: ['F&B', 'Thời trang', 'Mỹ phẩm', 'Gia dụng', 'Công nghệ'],
  locations: [{
    id: 'HN-BB-042',
    lat: 21.003,
    lng: 105.821,
    img: '/v1-assets/assets/ooh/hanoi-133-stkm.jpg',
    name: 'Ngã tư Sở, Hà Nội',
    type: 'Billboard',
    city: 'Hà Nội',
    size: '8×12m',
    priceN: 45,
    status: 'available',
    scores: {
      'F&B': [92, 'Lưu lượng cao, gần khu ăn uống'],
      'Thời trang': [74, 'Trục mua sắm nội đô'],
      'Mỹ phẩm': [70, 'Tệp trẻ đô thị'],
      'Gia dụng': [66, 'Khu dân cư đông'],
      'Công nghệ': [62, 'Gần trường đại học']
    }
  }, {
    id: 'HN-AP-011',
    lat: 21.214,
    lng: 105.803,
    img: '/v1-assets/assets/ooh/noibai-41b.jpg',
    name: 'Nội Bài T2, băng chuyền đến',
    type: 'Sân bay',
    city: 'Hà Nội',
    size: '6×4m',
    priceN: 60,
    status: 'available',
    scores: {
      'F&B': [85, 'Tiếp cận khách bay, thu nhập cao'],
      'Thời trang': [88, 'Khách quốc tế, chi trả cao'],
      'Mỹ phẩm': [84, 'Khách du lịch mua sắm'],
      'Gia dụng': [58, 'Ít quyết định mua tại chỗ'],
      'Công nghệ': [80, 'Doanh nhân công tác']
    }
  }, {
    id: 'HN-LED-007',
    lat: 21.016,
    lng: 105.779,
    img: '/v1-assets/assets/ooh/hanoi-cg01-nct.png',
    name: 'LED Phạm Hùng, Hà Nội',
    type: 'LED',
    city: 'Hà Nội',
    size: '10×6m',
    priceN: 40,
    status: 'soon',
    scores: {
      'F&B': [71, 'Giờ cao điểm văn phòng'],
      'Thời trang': [65, 'Trục đường lớn'],
      'Mỹ phẩm': [60, 'Tệp văn phòng'],
      'Gia dụng': [55, 'Xe qua nhanh'],
      'Công nghệ': [78, 'Khu văn phòng, đúng tệp công nghệ']
    }
  }, {
    id: 'SG-BB-118',
    lat: 10.801,
    lng: 106.711,
    img: '/v1-assets/assets/ooh/phapvan-19a.png',
    name: 'Cầu vượt Hàng Xanh, TP.HCM',
    type: 'Billboard',
    city: 'TP.HCM',
    size: '12×8m',
    priceN: 55,
    status: 'available',
    scores: {
      'F&B': [81, 'Nút giao lưu lượng lớn'],
      'Thời trang': [72, 'Cửa ngõ trung tâm'],
      'Mỹ phẩm': [69, 'Tệp trẻ năng động'],
      'Gia dụng': [73, 'Trục về khu dân cư'],
      'Công nghệ': [64, 'Đa dạng tệp']
    }
  }, {
    id: 'SG-AP-023',
    lat: 10.813,
    lng: 106.664,
    img: '/v1-assets/assets/ooh/vungtau-sgvt.jpg',
    name: 'Tân Sơn Nhất, sảnh quốc nội',
    type: 'Sân bay',
    city: 'TP.HCM',
    size: '5×3m',
    priceN: 58,
    status: 'available',
    scores: {
      'F&B': [79, 'Khách chờ bay, thời gian tiếp xúc dài'],
      'Thời trang': [83, 'Tệp trung–cao cấp'],
      'Mỹ phẩm': [86, 'Khách bay nữ giới cao'],
      'Gia dụng': [54, 'Ít liên quan bối cảnh'],
      'Công nghệ': [76, 'Doanh nhân nội địa']
    }
  }, {
    id: 'DN-PN-031',
    lat: 16.061,
    lng: 108.245,
    img: '/v1-assets/assets/ooh/quangninh-hl16.jpg',
    name: 'Pano Võ Nguyên Giáp, Đà Nẵng',
    type: 'Pano',
    city: 'Đà Nẵng',
    size: '6×9m',
    priceN: 32,
    status: 'booked',
    scores: {
      'F&B': [68, 'Trục du lịch biển'],
      'Thời trang': [61, 'Khách du lịch'],
      'Mỹ phẩm': [63, 'Tệp du lịch nghỉ dưỡng'],
      'Gia dụng': [48, 'Ngoài bối cảnh mua'],
      'Công nghệ': [45, 'Tệp không tập trung']
    }
  }],
  fmt: n => n.toLocaleString('vi-VN') + '.000.000đ/tháng',
  services: [{
    icon: 'plane',
    name: 'Sân bay',
    slug: 'san-bay',
    desc: 'Nội Bài, Tân Sơn Nhất, Đà Nẵng. Nhóm khách chi trả cao.',
    from: 35,
    count: '~730 mặt biển',
    feats: ['Băng chuyền, sảnh đến/đi, ống lồng', 'Tệp khách doanh nhân, du lịch, quốc tế', 'Thời gian tiếp xúc dài khi chờ chuyến']
  }, {
    icon: 'rectangle-horizontal',
    name: 'Billboard',
    slug: 'billboard',
    desc: 'Tấm lớn cao tốc, cửa ngõ và nội đô toàn quốc.',
    from: 40,
    count: '30+ tỉnh/thành',
    feats: ['Vị trí nút giao, cửa ngõ lưu lượng cao', 'Khảo sát + thiết kế + in ấn + thi công trọn gói', 'Hỗ trợ giấy phép quảng cáo']
  }, {
    icon: 'monitor',
    name: 'Màn hình LED',
    slug: 'led',
    desc: 'LED ngoài trời & LCD/frame thang máy, TTTM.',
    from: 25,
    count: 'Phát theo khung giờ',
    feats: ['Đặt theo spot 15-30 giây, đổi nội dung nhanh', 'Khung giờ vàng khu văn phòng, TTTM', 'Báo cáo tần suất phát thực tế']
  }, {
    icon: 'lamp',
    name: 'Pano · Hộp đèn',
    slug: 'pano',
    desc: 'Nhà chờ xe bus, giải phân cách, tuyến phố.',
    from: 8,
    count: 'Chuỗi phủ tuyến phố',
    feats: ['Chi phí vào cửa thấp, phủ dày theo tuyến', 'Phù hợp chiến dịch khu vực, mở điểm bán', 'Combo nhiều mặt giảm chi phí/điểm']
  }],
  steps: [['map', 'Khám phá bản đồ & lọc vị trí'], ['sparkles', 'Xem điểm AI theo ngành hàng'], ['square-check', 'Chọn vị trí muốn thuê'], ['file-text', 'Nhận báo giá PDF nháp tự động'], ['phone', 'Sales liên hệ & chốt']],
  clusters: [[105.72, 21.06, 15], [105.75, 20.98, 8], [105.76, 21.10, 7], [105.78, 21.05, 12], [105.80, 20.95, 5], [105.80, 21.09, 13], [105.81, 21.00, 9], [105.82, 21.06, 20], [105.83, 20.97, 6], [105.84, 21.03, 27], [105.85, 21.10, 18], [105.86, 20.99, 11], [105.87, 21.05, 4], [105.88, 21.01, 13], [105.89, 21.08, 16], [105.90, 20.96, 5], [105.91, 21.03, 28], [105.92, 21.07, 9], [105.94, 21.00, 3], [105.95, 21.05, 16], [105.77, 20.93, 3], [105.86, 20.92, 22]],
  newsTags: ['Tất cả', 'Hệ thống vị trí', 'Sản phẩm số', 'Hợp tác', 'Thị trường OOH'],
  offices: [{
    city: 'Hà Nội',
    role: 'Trụ sở chính',
    addr: '265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội'
  }, {
    city: 'TP. Hồ Chí Minh',
    role: 'Văn phòng đại diện',
    addr: 'Khu vực miền Nam'
  }, {
    city: 'Đà Nẵng',
    role: 'Văn phòng đại diện',
    addr: 'Khu vực miền Trung'
  }, {
    city: 'Cần Thơ',
    role: 'Văn phòng đại diện',
    addr: 'Khu vực Đồng bằng sông Cửu Long'
  }, {
    city: 'Nghệ An',
    role: 'Văn phòng đại diện',
    addr: 'Khu vực Bắc Trung Bộ'
  }],
  capabilities: [{
    icon: 'rectangle-horizontal',
    label: 'Biển quảng cáo tấm lớn ngoài trời'
  }, {
    icon: 'plane',
    label: 'Quảng cáo tại sân bay'
  }, {
    icon: 'bus',
    label: 'Quảng cáo tại nhà chờ, trên xe bus, taxi'
  }, {
    icon: 'monitor',
    label: 'Màn hình LED ngoài trời'
  }, {
    icon: 'tablet-smartphone',
    label: 'LCD/frame tại thang máy, TTTM'
  }, {
    icon: 'compass',
    label: 'Tư vấn, quy hoạch quảng cáo'
  }, {
    icon: 'palette',
    label: 'Thiết kế, in ấn, thi công'
  }, {
    icon: 'calendar-days',
    label: 'Roadshow, tổ chức sự kiện'
  }],
  news: [{
    img: '/v1-assets/assets/ooh/bacninh-10b.png',
    date: '02.07.2026',
    tag: 'Hệ thống vị trí',
    title: 'Toàn Cầu mở rộng hệ thống LED tại trục Phạm Hùng',
    excerpt: 'Bổ sung 4 màn hình LED mới tại khu văn phòng phía Tây Hà Nội, khai thác từ quý 3/2026.'
  }, {
    img: '/v1-assets/assets/ooh/phapvan-19a.png',
    date: '18.06.2026',
    tag: 'Sản phẩm số',
    title: 'Ra mắt bản đồ vị trí OOH tra cứu trực tuyến',
    excerpt: 'Khách hàng tự khám phá vị trí, xem điểm AI theo ngành hàng và tạo báo giá PDF trong vài phút.'
  }, {
    img: '/v1-assets/assets/ooh/quangninh-hl16.jpg',
    date: '05.06.2026',
    tag: 'Hợp tác',
    title: 'Hợp tác quảng cáo tại nhà chờ xe bus 5 tỉnh thành',
    excerpt: 'Mạng lưới nhà chờ mở rộng tại Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ và Nghệ An.'
  }, {
    img: '/v1-assets/assets/ooh/phapvan-51a.png',
    date: '22.05.2026',
    tag: 'Thị trường OOH',
    title: 'Xu hướng OOH 2026: dữ liệu vị trí và điểm phù hợp ngành hàng',
    excerpt: 'Quảng cáo ngoài trời chuyển dịch sang mô hình chọn vị trí theo dữ liệu lưu lượng và tệp khách.'
  }, {
    img: '/v1-assets/assets/ooh/noibai-41b.jpg',
    date: '10.05.2026',
    tag: 'Hệ thống vị trí',
    title: 'Bổ sung 12 mặt biển tại nhà ga T2 Nội Bài',
    excerpt: 'Các vị trí băng chuyền và sảnh đến quốc tế sẵn sàng khai thác từ tháng 6.'
  }, {
    img: '/v1-assets/assets/ooh/noibai-24a1.jpg',
    date: '28.04.2026',
    tag: 'Hợp tác',
    title: 'Đồng hành cùng hãng hàng không trong chiến dịch hè 2026',
    excerpt: 'Chuỗi vị trí sân bay hai miền phục vụ chiến dịch quảng bá đường bay mới.'
  }],
  cases: [{
    img: '/v1-assets/assets/ooh/haiphong-caurao2.jpg',
    brand: 'Nhãn hàng F&B',
    industry: 'F&B',
    result: 'Phủ 12 billboard nội đô Hà Nội'
  }, {
    img: '/v1-assets/assets/ooh/noibai-24a1.jpg',
    brand: 'Hãng hàng không',
    industry: 'Hàng không',
    result: 'Chuỗi vị trí sân bay 2 miền'
  }, {
    img: '/v1-assets/assets/ooh/quangninh-hl30.jpg',
    brand: 'Thương hiệu điện tử',
    industry: 'Điện tử',
    result: 'LED giờ vàng trục văn phòng'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
const NS = window.ToNCUADVDesignSystem_ce468e || {};
const {
  Button,
  TrustStats,
  FilterChip,
  FilterBar,
  LocationCard,
  CaseStudyCard,
  Select,
  Field,
  Input,
  Textarea,
  Checkbox,
  MapMarker,
  MapPopup,
  StatusPill,
  AIScoreBadge
} = NS;
const D = window.TCG_DATA;
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 2
}) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': stroke,
          stroke: color
        },
        nameAttr: 'data-lucide',
        icons: window.lucide.icons
      });
    }
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color
    }
  });
}
const container = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 32px'
};
function Navbar({
  onQuote
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: 72
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/v1-assets/assets/logo-full.png",
    alt: "To\xE0n C\u1EA7u ADV",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--primary)',
      fontSize: '1.125rem',
      fontFamily: 'var(--font-display)',
      letterSpacing: '.01em'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.6875rem',
      color: 'var(--muted-foreground)',
      letterSpacing: '.05em'
    }
  }))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 22,
      fontSize: '.9375rem',
      fontWeight: 500,
      flex: 1
    }
  }, [['index.html', 'Trang chủ'], ['about.html', 'Về chúng tôi'], ['map.html', 'Bản đồ'], ['services.html', 'Dịch vụ'], ['news.html', 'Tin tức'], ['index.html#lien-he', 'Liên hệ']].map(([h, l]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    style: {
      color: window.location.pathname.endsWith('/' + h) || h === 'index.html' && /\/(index\.html)?$/.test(window.location.pathname) ? 'var(--primary)' : 'var(--slate-600)',
      fontWeight: window.location.pathname.endsWith('/' + h) ? 600 : 500,
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    size: "sm",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Y\xEAu c\u1EA7u b\xE1o gi\xE1")));
}
const HERO_SLIDES = [{
  img: '/v1-assets/assets/ooh/phapvan-51a.png',
  eyebrow: 'Từ 2003 đến nay',
  title: 'Hơn 20 năm cùng ngành quảng cáo Việt Nam',
  body: 'Từ tổ chức sự kiện, in ấn đến biển quảng cáo tấm lớn, Toàn Cầu ADV trưởng thành cùng ngành OOH Việt Nam qua từng giai đoạn.'
}, {
  img: '/v1-assets/assets/ooh/noibai-41b.jpg',
  eyebrow: 'Mạng lưới sân bay',
  title: 'Tiếp cận nhóm khách chi trả cao',
  body: 'Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn, nơi tập trung doanh nhân, khách du lịch và khách quốc tế.'
}, {
  img: '/v1-assets/assets/ooh/phapvan-19a.png',
  eyebrow: 'Toàn quốc',
  title: 'Billboard, LED và nhà chờ phủ khắp các tỉnh thành',
  body: '~730 vị trí quảng cáo ngoài trời từ cao tốc, cửa ngõ đô thị đến nhà chờ xe bus trên khắp Việt Nam.'
}, {
  img: '/v1-assets/assets/ooh/quangninh-hl16.jpg',
  eyebrow: 'Chuyển đổi số',
  title: 'Bản đồ vị trí và điểm AI gợi ý theo ngành hàng',
  body: 'Tự khám phá vị trí phù hợp, xem điểm AI giải thích rõ lý do, và nhận báo giá PDF trong vài phút.'
}];
function Hero() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = HERO_SLIDES[i];
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      color: '#fff',
      overflow: 'hidden',
      minHeight: 560,
      background: 'var(--blue-900)'
    }
  }, /*#__PURE__*/React.createElement("style", null, '.hero-cta{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.hero-cta:hover{transform:translateY(-2px)}.hero-cta:active{transform:translateY(0) scale(.98)}.hero-dot{transition:all .3s var(--ease-standard)}'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '66%',
      height: '100%'
    }
  }, HERO_SLIDES.map((sl, idx) => /*#__PURE__*/React.createElement("img", {
    key: idx,
    src: sl.img,
    alt: sl.title,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: idx === i ? 1 : 0,
      transition: 'opacity 1.1s ease'
    }
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "380",
    height: "380",
    viewBox: "0 0 380 380",
    style: {
      position: 'absolute',
      top: -50,
      left: '30%',
      pointerEvents: 'none',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40 380 C 40 200, 200 40, 380 40",
    fill: "none",
    stroke: "var(--blue-500)",
    strokeWidth: "24",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 380 C 10 170, 170 10, 380 10",
    fill: "none",
    stroke: "var(--blue-300)",
    strokeWidth: "6",
    strokeLinecap: "round",
    opacity: "0.85"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg,var(--blue-900) 0%,var(--blue-900) 38%,rgba(13,47,94,.75) 52%,rgba(13,47,94,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      ...container,
      padding: '96px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20,
      justifyItems: 'start',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--blue-200)'
    }
  }, s.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2.25rem,3.4vw,3.25rem)',
      fontWeight: 600,
      lineHeight: 1.16,
      textWrap: 'balance'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.6,
      color: 'var(--slate-200)',
      maxWidth: 520
    }
  }, s.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "hero-cta",
    onClick: () => {
      window.location.href = 'map.html';
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 24px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cta)',
      color: 'var(--cta-foreground)',
      fontWeight: 600,
      fontSize: '1.0625rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "map",
    size: 19
  }), " Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement("button", {
    className: "hero-cta",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 24px',
      border: '1.5px solid rgba(255,255,255,.5)',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      color: '#fff',
      fontWeight: 600,
      fontSize: '1.0625rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "phone-call",
    size: 19
  }), " Nh\u1EADn t\u01B0 v\u1EA5n")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14
    }
  }, HERO_SLIDES.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    "aria-label": 'Slide ' + (idx + 1),
    onClick: () => setI(idx),
    className: "hero-dot",
    style: {
      width: idx === i ? 26 : 8,
      height: 8,
      borderRadius: 4,
      border: 'none',
      cursor: 'pointer',
      background: idx === i ? '#fff' : 'rgba(255,255,255,.4)'
    }
  }))))));
}
function go(h) {
  const el = document.querySelector(h);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}
function Stats() {
  const names = ['Đối tác 1', 'Đối tác 2', 'Đối tác 3', 'Đối tác 4', 'Đối tác 5', 'Đối tác 6', 'Đối tác 7', 'Đối tác 8'];
  const Row = ({
    dur,
    delay
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      width: 'max-content',
      animation: `tcgmarquee ${dur}s linear ${delay}s infinite`
    }
  }, [...names, ...names].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 140,
      height: 52,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: '#fff',
      border: '1px dashed var(--slate-300)',
      display: 'grid',
      placeItems: 'center',
      fontSize: '.6875rem',
      color: 'var(--slate-400)',
      letterSpacing: '.05em'
    }
  }, n.toUpperCase()))));
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--muted)',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes tcgmarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media (prefers-reduced-motion: reduce){[style*="tcgmarquee"]{animation:none!important}}'), /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Row, {
    dur: 30,
    delay: 0
  }), /*#__PURE__*/React.createElement(Row, {
    dur: 18,
    delay: 0
  })));
}
function SectionHead({
  kicker,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      justifyItems: 'center',
      textAlign: 'center',
      marginBottom: 40
    }
  }, kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--brick-500)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      lineHeight: 1.18,
      color: 'var(--primary)',
      textWrap: 'balance'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)',
      fontSize: 'var(--text-body-lg)',
      maxWidth: 640
    }
  }, sub));
}
const FEATURED_SERVICES = [{
  slug: 'san-bay',
  icon: 'plane',
  label: 'Sân bay',
  title: 'Tiếp cận nhóm khách chi trả cao',
  desc: 'Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn: băng chuyền, sảnh đến/đi, ống lồng. Tiếp cận doanh nhân, khách du lịch và khách quốc tế trong thời gian chờ chuyến kéo dài.',
  img: '/v1-assets/assets/ooh/noibai-41b.jpg',
  cta: 'Xem dịch vụ sân bay'
}, {
  slug: 'billboard',
  icon: 'rectangle-horizontal',
  label: 'Billboard',
  title: 'Hiện diện tại cửa ngõ và trục đường lớn',
  desc: 'Biển quảng cáo tấm lớn tại nút giao, cửa ngõ đô thị và cao tốc trên 30+ tỉnh thành. Khảo sát, thiết kế, in ấn và thi công trọn gói, hỗ trợ giấy phép quảng cáo.',
  img: '/v1-assets/assets/ooh/phapvan-19a.png',
  cta: 'Xem dịch vụ billboard'
}, {
  slug: 'led',
  icon: 'monitor',
  label: 'Màn hình LED',
  title: 'Nội dung linh hoạt, đổi theo khung giờ',
  desc: 'LED ngoài trời và LCD/frame tại thang máy, trung tâm thương mại. Đặt theo spot 15 đến 30 giây, đổi nội dung nhanh, báo cáo tần suất phát thực tế.',
  img: '/v1-assets/assets/ooh/hanoi-cg01-nct.png',
  cta: 'Xem dịch vụ LED'
}, {
  slug: 'pano',
  icon: 'lamp',
  label: 'Pano · Hộp đèn',
  title: 'Phủ dày theo tuyến, chi phí hợp lý',
  desc: 'Quảng cáo tại nhà chờ xe bus, giải phân cách và tuyến phố. Chi phí vào cửa thấp, phù hợp chiến dịch khu vực và mở điểm bán, có combo nhiều mặt giảm chi phí.',
  img: '/v1-assets/assets/ooh/quangninh-hl16.jpg',
  cta: 'Xem dịch vụ pano'
}, {
  slug: null,
  icon: 'briefcase',
  label: 'Dự án tiêu biểu',
  title: 'Đồng hành cùng 400+ nhãn hàng',
  desc: 'Từ FMCG, ngân hàng đến hàng không và công nghệ. Xem các chiến dịch OOH tiêu biểu Toàn Cầu ADV đã triển khai trên toàn quốc.',
  img: '/v1-assets/assets/ooh/haiphong-caurao2.jpg',
  cta: 'Xem dự án tiêu biểu',
  href: 'news.html'
}];
function Spotlight() {
  const [i, setI] = React.useState(0);
  const s = FEATURED_SERVICES[i];
  return /*#__PURE__*/React.createElement("section", {
    id: "spotlight",
    style: {
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: container
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "D\u1ECBch v\u1EE5 n\u1ED5i b\u1EADt",
    title: "Gi\u1EA3i ph\xE1p OOH c\u1EE7a To\xE0n C\u1EA7u",
    sub: "Kh\xE1m ph\xE1 c\xE1c nh\xF3m d\u1ECBch v\u1EE5 ch\xEDnh, t\u1EEB s\xE2n bay \u0111\u1EBFn billboard, LED v\xE0 nh\xE0 ch\u1EDD."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1.15fr 1fr',
      gap: 28,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      alignContent: 'start'
    }
  }, FEATURED_SERVICES.map((f, idx) => /*#__PURE__*/React.createElement("button", {
    key: f.label,
    onClick: () => setI(idx),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '0 18px',
      borderRadius: 'var(--radius-md)',
      border: idx === i ? 'none' : '1px solid var(--border)',
      background: idx === i ? 'linear-gradient(115deg,var(--blue-900),var(--blue-500))' : '#fff',
      color: idx === i ? '#fff' : 'var(--foreground)',
      fontWeight: 600,
      fontSize: '.9375rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      textAlign: 'left',
      boxShadow: idx === i ? 'var(--shadow-md)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: f.icon,
    size: 18
  }), f.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)',
      minHeight: 320
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.img,
    alt: s.label,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14,
      alignContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h3)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.3
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      color: 'var(--slate-600)',
      lineHeight: 1.65
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    onClick: () => {
      window.location.href = s.href || 'services.html#svc-' + s.slug;
    }
  }, s.cta))))));
}
Object.assign(window, {
  Icon,
  Navbar,
  Hero,
  Stats,
  SectionHead,
  Spotlight,
  go,
  container
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.standalone.jsx
try { (() => {
const NS = window.ToNCUADVDesignSystem_ce468e || {};
const {
  Button,
  TrustStats,
  FilterChip,
  FilterBar,
  LocationCard,
  CaseStudyCard,
  Select,
  Field,
  Input,
  Textarea,
  Checkbox,
  MapMarker,
  MapPopup,
  StatusPill,
  AIScoreBadge
} = NS;
const D = window.TCG_DATA;
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  stroke = 2
}) {
  const ref = React.useRef();
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': stroke,
          stroke: color
        },
        nameAttr: 'data-lucide',
        icons: window.lucide.icons
      });
    }
  }, [name]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color
    }
  });
}
const container = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 32px'
};
function Navbar({
  onQuote
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: 72
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.logoFull,
    alt: "To\xE0n C\u1EA7u ADV",
    style: {
      height: 40
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--primary)',
      fontSize: '1.125rem',
      fontFamily: 'var(--font-display)',
      letterSpacing: '.01em'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.6875rem',
      color: 'var(--muted-foreground)',
      letterSpacing: '.05em'
    }
  }))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 22,
      fontSize: '.9375rem',
      fontWeight: 500,
      flex: 1
    }
  }, [['index.html', 'Trang chủ'], ['map.html', 'Bản đồ'], ['services.html', 'Dịch vụ'], ['news.html', 'Tin tức'], ['index.html#lien-he', 'Liên hệ']].map(([h, l]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    style: {
      color: window.location.pathname.endsWith('/' + h) || h === 'index.html' && /\/(index\.html)?$/.test(window.location.pathname) ? 'var(--primary)' : 'var(--slate-600)',
      fontWeight: window.location.pathname.endsWith('/' + h) ? 600 : 500,
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    size: "sm",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Y\xEAu c\u1EA7u b\xE1o gi\xE1")));
}
const HERO_SLIDES = [{
  img: '/v1-assets/assets/ooh/phapvan-51a.png',
  eyebrow: 'Từ 2003 đến nay',
  title: 'Hơn 20 năm cùng ngành quảng cáo Việt Nam',
  body: 'Từ tổ chức sự kiện, in ấn đến biển quảng cáo tấm lớn, Toàn Cầu ADV trưởng thành cùng ngành OOH Việt Nam qua từng giai đoạn.'
}, {
  img: '/v1-assets/assets/ooh/noibai-41b.jpg',
  eyebrow: 'Mạng lưới sân bay',
  title: 'Tiếp cận nhóm khách chi trả cao',
  body: 'Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn, nơi tập trung doanh nhân, khách du lịch và khách quốc tế.'
}, {
  img: '/v1-assets/assets/ooh/phapvan-19a.png',
  eyebrow: 'Toàn quốc',
  title: 'Billboard, LED và nhà chờ phủ khắp các tỉnh thành',
  body: '~730 vị trí quảng cáo ngoài trời từ cao tốc, cửa ngõ đô thị đến nhà chờ xe bus trên khắp Việt Nam.'
}, {
  img: '/v1-assets/assets/ooh/quangninh-hl16.jpg',
  eyebrow: 'Chuyển đổi số',
  title: 'Bản đồ vị trí và điểm AI gợi ý theo ngành hàng',
  body: 'Tự khám phá vị trí phù hợp, xem điểm AI giải thích rõ lý do, và nhận báo giá PDF trong vài phút.'
}];
function Hero() {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = HERO_SLIDES[i];
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      color: '#fff',
      overflow: 'hidden',
      minHeight: 560,
      background: 'var(--blue-900)'
    }
  }, /*#__PURE__*/React.createElement("style", null, '.hero-cta{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.hero-cta:hover{transform:translateY(-2px)}.hero-cta:active{transform:translateY(0) scale(.98)}.hero-dot{transition:all .3s var(--ease-standard)}'), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: '66%',
      height: '100%'
    }
  }, HERO_SLIDES.map((sl, idx) => /*#__PURE__*/React.createElement("img", {
    key: idx,
    src: sl.img,
    alt: sl.title,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      opacity: idx === i ? 1 : 0,
      transition: 'opacity 1.1s ease'
    }
  }))), /*#__PURE__*/React.createElement("svg", {
    width: "380",
    height: "380",
    viewBox: "0 0 380 380",
    style: {
      position: 'absolute',
      top: -50,
      left: '30%',
      pointerEvents: 'none',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40 380 C 40 200, 200 40, 380 40",
    fill: "none",
    stroke: "var(--blue-500)",
    strokeWidth: "24",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 380 C 10 170, 170 10, 380 10",
    fill: "none",
    stroke: "var(--blue-300)",
    strokeWidth: "6",
    strokeLinecap: "round",
    opacity: "0.85"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(100deg,var(--blue-900) 0%,var(--blue-900) 38%,rgba(13,47,94,.75) 52%,rgba(13,47,94,0) 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      ...container,
      padding: '96px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 20,
      justifyItems: 'start',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      fontWeight: 700,
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: 'var(--blue-200)'
    }
  }, s.eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(2.25rem,3.4vw,3.25rem)',
      fontWeight: 600,
      lineHeight: 1.16,
      textWrap: 'balance'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      lineHeight: 1.6,
      color: 'var(--slate-200)',
      maxWidth: 520
    }
  }, s.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "hero-cta",
    onClick: () => {
      window.location.href = 'map.html';
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 24px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cta)',
      color: 'var(--cta-foreground)',
      fontWeight: 600,
      fontSize: '1.0625rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "map",
    size: 19
  }), " Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement("button", {
    className: "hero-cta",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 24px',
      border: '1.5px solid rgba(255,255,255,.5)',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      color: '#fff',
      fontWeight: 600,
      fontSize: '1.0625rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "phone-call",
    size: 19
  }), " Nh\u1EADn t\u01B0 v\u1EA5n")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14
    }
  }, HERO_SLIDES.map((_, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    "aria-label": 'Slide ' + (idx + 1),
    onClick: () => setI(idx),
    className: "hero-dot",
    style: {
      width: idx === i ? 26 : 8,
      height: 8,
      borderRadius: 4,
      border: 'none',
      cursor: 'pointer',
      background: idx === i ? '#fff' : 'rgba(255,255,255,.4)'
    }
  }))))));
}
function go(h) {
  const el = document.querySelector(h);
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
}
function Stats() {
  const names = ['Đối tác 1', 'Đối tác 2', 'Đối tác 3', 'Đối tác 4', 'Đối tác 5', 'Đối tác 6', 'Đối tác 7', 'Đối tác 8'];
  const Row = ({
    dur,
    delay
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      width: 'max-content',
      animation: `tcgmarquee ${dur}s linear ${delay}s infinite`
    }
  }, [...names, ...names].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 140,
      height: 52,
      flex: 'none',
      borderRadius: 'var(--radius-md)',
      background: '#fff',
      border: '1px dashed var(--slate-300)',
      display: 'grid',
      placeItems: 'center',
      fontSize: '.6875rem',
      color: 'var(--slate-400)',
      letterSpacing: '.05em'
    }
  }, n.toUpperCase()))));
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--muted)',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement("style", null, '@keyframes tcgmarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}@media (prefers-reduced-motion: reduce){[style*="tcgmarquee"]{animation:none!important}}'), /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: 'grid',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Row, {
    dur: 30,
    delay: 0
  }), /*#__PURE__*/React.createElement(Row, {
    dur: 18,
    delay: 0
  })));
}
function SectionHead({
  kicker,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      justifyItems: 'center',
      textAlign: 'center',
      marginBottom: 40
    }
  }, kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: 'var(--brick-500)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      lineHeight: 1.18,
      color: 'var(--primary)',
      textWrap: 'balance'
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)',
      fontSize: 'var(--text-body-lg)',
      maxWidth: 640
    }
  }, sub));
}
const FEATURED_SERVICES = [{
  slug: 'san-bay',
  icon: 'plane',
  label: 'Sân bay',
  title: 'Tiếp cận nhóm khách chi trả cao',
  desc: 'Hệ thống mặt biển tại Nội Bài, Tân Sơn Nhất và các sân bay lớn: băng chuyền, sảnh đến/đi, ống lồng. Tiếp cận doanh nhân, khách du lịch và khách quốc tế trong thời gian chờ chuyến kéo dài.',
  img: '/v1-assets/assets/ooh/noibai-41b.jpg',
  cta: 'Xem dịch vụ sân bay'
}, {
  slug: 'billboard',
  icon: 'rectangle-horizontal',
  label: 'Billboard',
  title: 'Hiện diện tại cửa ngõ và trục đường lớn',
  desc: 'Biển quảng cáo tấm lớn tại nút giao, cửa ngõ đô thị và cao tốc trên 30+ tỉnh thành. Khảo sát, thiết kế, in ấn và thi công trọn gói, hỗ trợ giấy phép quảng cáo.',
  img: '/v1-assets/assets/ooh/phapvan-19a.png',
  cta: 'Xem dịch vụ billboard'
}, {
  slug: 'led',
  icon: 'monitor',
  label: 'Màn hình LED',
  title: 'Nội dung linh hoạt, đổi theo khung giờ',
  desc: 'LED ngoài trời và LCD/frame tại thang máy, trung tâm thương mại. Đặt theo spot 15 đến 30 giây, đổi nội dung nhanh, báo cáo tần suất phát thực tế.',
  img: '/v1-assets/assets/ooh/hanoi-cg01-nct.png',
  cta: 'Xem dịch vụ LED'
}, {
  slug: 'pano',
  icon: 'lamp',
  label: 'Pano · Hộp đèn',
  title: 'Phủ dày theo tuyến, chi phí hợp lý',
  desc: 'Quảng cáo tại nhà chờ xe bus, giải phân cách và tuyến phố. Chi phí vào cửa thấp, phù hợp chiến dịch khu vực và mở điểm bán, có combo nhiều mặt giảm chi phí.',
  img: '/v1-assets/assets/ooh/quangninh-hl16.jpg',
  cta: 'Xem dịch vụ pano'
}, {
  slug: null,
  icon: 'briefcase',
  label: 'Dự án tiêu biểu',
  title: 'Đồng hành cùng 400+ nhãn hàng',
  desc: 'Từ FMCG, ngân hàng đến hàng không và công nghệ. Xem các chiến dịch OOH tiêu biểu Toàn Cầu ADV đã triển khai trên toàn quốc.',
  img: '/v1-assets/assets/ooh/haiphong-caurao2.jpg',
  cta: 'Xem dự án tiêu biểu',
  href: 'news.html'
}];
function Spotlight() {
  const [i, setI] = React.useState(0);
  const s = FEATURED_SERVICES[i];
  return /*#__PURE__*/React.createElement("section", {
    id: "spotlight",
    style: {
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: container
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "D\u1ECBch v\u1EE5 n\u1ED5i b\u1EADt",
    title: "Gi\u1EA3i ph\xE1p OOH c\u1EE7a To\xE0n C\u1EA7u",
    sub: "Kh\xE1m ph\xE1 c\xE1c nh\xF3m d\u1ECBch v\u1EE5 ch\xEDnh, t\u1EEB s\xE2n bay \u0111\u1EBFn billboard, LED v\xE0 nh\xE0 ch\u1EDD."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1.15fr 1fr',
      gap: 28,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10,
      alignContent: 'start'
    }
  }, FEATURED_SERVICES.map((f, idx) => /*#__PURE__*/React.createElement("button", {
    key: f.label,
    onClick: () => setI(idx),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 56,
      padding: '0 18px',
      borderRadius: 'var(--radius-md)',
      border: idx === i ? 'none' : '1px solid var(--border)',
      background: idx === i ? 'linear-gradient(115deg,var(--blue-900),var(--blue-500))' : '#fff',
      color: idx === i ? '#fff' : 'var(--foreground)',
      fontWeight: 600,
      fontSize: '.9375rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      textAlign: 'left',
      boxShadow: idx === i ? 'var(--shadow-md)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: f.icon,
    size: 18
  }), f.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)',
      minHeight: 320
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.img,
    alt: s.label,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 14,
      alignContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h3)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.3
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      color: 'var(--slate-600)',
      lineHeight: 1.65
    }
  }, s.desc), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    onClick: () => {
      window.location.href = s.href || 'services.html#svc-' + s.slug;
    }
  }, s.cta))))));
}
Object.assign(window, {
  Icon,
  Navbar,
  Hero,
  Stats,
  SectionHead,
  Spotlight,
  go,
  container
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.standalone.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections2.jsx
try { (() => {
const NS2 = window.ToNCUADVDesignSystem_ce468e || {};
const {
  Button,
  FilterBar,
  FilterChip,
  Select,
  LocationCard,
  CaseStudyCard,
  Field,
  Input,
  Textarea,
  Checkbox,
  MapMarker,
  MapPopup,
  StatusPill,
  AIScoreBadge,
  Toast,
  QuoteTray
} = NS2;
const D2 = window.TCG_DATA;
const ESRI_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const OSM_TILES = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png';
function statusPillStyle(st) {
  const c = st === 'booked' ? {
    bg: 'rgba(244,114,182,.18)',
    fg: '#F472B6',
    label: 'Đã thuê'
  } : st === 'soon' ? {
    bg: 'rgba(245,158,11,.18)',
    fg: '#F59E0B',
    label: 'Sắp hết'
  } : {
    bg: 'rgba(45,212,191,.16)',
    fg: '#2DD4BF',
    label: 'Còn trống'
  };
  return c;
}
function MapPreview() {
  return /*#__PURE__*/React.createElement("section", {
    id: "map",
    style: {
      background: '#fff',
      padding: '96px 0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, '.map-cta{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.map-cta:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg)}.map-pulse{animation:mappulse 2s ease-in-out infinite}@keyframes mappulse{0%,100%{box-shadow:0 0 0 0 rgba(35,116,217,.45)}50%{box-shadow:0 0 0 8px rgba(35,116,217,0)}}@media (prefers-reduced-motion: reduce){.map-pulse{animation:none}}'), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: '.95fr 1.05fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 18,
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-50)',
      color: 'var(--blue-700)',
      fontSize: '.75rem',
      fontWeight: 700,
      letterSpacing: '.06em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "map",
    size: 15
  }), "B\u1EA3n \u0111\u1ED3 tr\u1EF1c tuy\u1EBFn"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.2
    }
  }, "B\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED OOH to\xE0n qu\u1ED1c"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--slate-600)',
      lineHeight: 1.6,
      maxWidth: 460
    }
  }, "L\u1ECDc theo t\u1EC9nh/th\xE0nh, lo\u1EA1i bi\u1EC3n, ng\xE2n s\xE1ch. Xem \u0111i\u1EC3m AI v\xE0 ch\u1ECDn v\u1ECB tr\xED \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1 trong v\xE0i ph\xFAt."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, [['~730', 'Vị trí OOH'], ['30+', 'Tỉnh/thành']].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--border)',
      background: 'var(--slate-50)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.125rem',
      color: 'var(--primary)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--muted-foreground)'
    }
  }, l)))), /*#__PURE__*/React.createElement("button", {
    className: "map-cta",
    onClick: () => {
      window.location.href = 'map.html';
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 24px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cta)',
      color: 'var(--cta-foreground)',
      fontWeight: 600,
      fontSize: '1rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-md)'
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED ", /*#__PURE__*/React.createElement(window.Icon, {
    name: "arrow-right",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '70%',
      height: '70%',
      left: '15%',
      top: '15%',
      background: 'var(--blue-200)',
      filter: 'blur(70px)',
      opacity: .5,
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'linear-gradient(160deg,#fff,var(--blue-50))',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/v1-assets/assets/world-map-dotted.png",
    alt: "B\u1EA3n \u0111\u1ED3 m\u1EA1ng l\u01B0\u1EDBi v\u1ECB tr\xED OOH To\xE0n C\u1EA7u",
    style: {
      width: '100%',
      display: 'block',
      mixBlendMode: 'multiply'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "map-pulse",
    style: {
      position: 'absolute',
      left: 24,
      top: 24,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--success)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, "\u0110ang khai th\xE1c tr\u1EF1c ti\u1EBFp")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--blue-900)',
      color: '#fff',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "sparkles",
    size: 16,
    color: "var(--blue-200)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      fontWeight: 600
    }
  }, "\u0110i\u1EC3m AI theo ng\xE0nh h\xE0ng")))));
}
function MapSection({
  onAdd,
  hideHead
}) {
  const locs = D2.locations;
  const mapEl = React.useRef(null);
  const mapRef = React.useRef(null);
  const onAddRef = React.useRef(onAdd);
  onAddRef.current = onAdd;
  const [sel, setSel] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [baseMap, setBaseMap] = React.useState('satellite');
  const [listOpen, setListOpen] = React.useState(true);
  const toggleList = v => {
    setListOpen(v);
    setTimeout(() => {
      mapRef.current && mapRef.current.resize();
    }, 30);
  };
  const switchBase = mode => {
    setBaseMap(mode);
    const map = mapRef.current;
    if (!map) return;
    map.setLayoutProperty('esri', 'visibility', mode === 'satellite' ? 'visible' : 'none');
    map.setLayoutProperty('osm', 'visibility', mode === 'street' ? 'visible' : 'none');
  };
  const openPopup = (map, l) => {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-sans);display:grid;gap:8px;width:230px';
    el.innerHTML = '<img src="' + l.img + '" alt="" style="width:100%;height:110px;object-fit:cover;border-radius:2px"/>' + '<strong style="font-size:14px;line-height:1.35">' + l.name + '</strong>' + '<span style="font-family:var(--font-mono);font-size:13px;color:var(--primary);font-weight:600">' + D2.fmt(l.priceN) + '</span>';
    const pill = statusPillStyle(l.status);
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;align-items:center';
    row.innerHTML = '<span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;background:' + pill.bg + ';color:' + (l.status === 'available' ? '#0F766E' : l.status === 'soon' ? '#92400E' : '#9D174D') + '">' + pill.label + '</span>';
    if (l.status !== 'booked') {
      const btn = document.createElement('button');
      btn.textContent = '+ Thêm báo giá';
      btn.style.cssText = 'flex:1;height:32px;border:none;border-radius:2px;background:var(--cta);color:#fff;font-weight:600;font-size:12.5px;font-family:var(--font-sans);cursor:pointer';
      btn.onclick = () => onAddRef.current && onAddRef.current(l);
      row.appendChild(btn);
    }
    el.appendChild(row);
    new window.maplibregl.Popup({
      offset: 14,
      maxWidth: '260px',
      closeOnClick: false
    }).setLngLat([l.lng, l.lat]).setDOMContent(el).addTo(map);
  };
  const openClusterPopup = (map, lng, lat, count) => {
    const near = [...locs].sort((p, q) => (p.lng - lng) ** 2 + (p.lat - lat) ** 2 - ((q.lng - lng) ** 2 + (q.lat - lat) ** 2)).slice(0, 3);
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-sans);display:grid;gap:0;width:min(300px,84vw)';
    el.innerHTML = '<div style="font-weight:600;font-size:13.5px;padding:2px 0 8px">' + count + ' vị trí trong khu vực</div>';
    near.forEach(l => {
      const p = statusPillStyle(l.status);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--border)';
      row.innerHTML = '<img src="' + l.img + '" alt="" style="width:52px;height:38px;object-fit:cover;border-radius:2px;flex:none"/>' + '<div style="display:grid;gap:2;min-width:0;flex:1">' + '<strong style="font-size:12.5px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + l.name + '</strong>' + '<span style="font-size:11px;color:var(--muted-foreground)">' + l.type + ' · <span style="font-family:var(--font-mono)">' + l.size + '</span> · <span style="font-family:var(--font-mono);color:var(--primary);font-weight:600">' + D2.fmt(l.priceN) + '</span></span>' + '</div>' + '<span style="flex:none;font-size:10px;font-weight:600;padding:2px 7px;border-radius:999px;background:' + p.bg + ';color:' + (l.status === 'available' ? '#0F766E' : l.status === 'soon' ? '#92400E' : '#9D174D') + '">' + p.label + '</span>';
      const btn = document.createElement('button');
      btn.textContent = 'Xem chi tiết vị trí';
      btn.style.cssText = 'display:none';
      row.style.cursor = 'pointer';
      row.onclick = () => openPopup(map, l);
      el.appendChild(row);
    });
    const note = document.createElement('div');
    note.style.cssText = 'font-size:11px;color:var(--muted-foreground);padding-top:8px;border-top:1px solid var(--border)';
    note.textContent = 'Dữ liệu mẫu. Bấm từng dòng để xem chi tiết, hoặc liên hệ để nhận danh sách đầy đủ.';
    el.appendChild(note);
    new window.maplibregl.Popup({
      offset: 16,
      maxWidth: 'none',
      closeOnClick: false
    }).setLngLat([lng, lat]).setDOMContent(el).addTo(map);
  };
  React.useEffect(() => {
    if (!window.maplibregl || !mapEl.current) return;
    const map = new window.maplibregl.Map({
      container: mapEl.current,
      style: {
        version: 8,
        sources: {
          esri: {
            type: 'raster',
            tiles: [ESRI_TILES],
            tileSize: 256,
            attribution: 'Tiles © Esri | Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          },
          osm: {
            type: 'raster',
            tiles: [OSM_TILES],
            tileSize: 512,
            attribution: '© OpenStreetMap contributors © CARTO'
          }
        },
        layers: [{
          id: 'esri',
          type: 'raster',
          source: 'esri'
        }, {
          id: 'osm',
          type: 'raster',
          source: 'osm',
          layout: {
            visibility: 'none'
          }
        }]
      },
      center: [105.845, 21.02],
      zoom: 10.4,
      attributionControl: {
        compact: false
      }
    });
    mapRef.current = map;
    map.addControl(new window.maplibregl.NavigationControl({
      showCompass: false
    }), 'bottom-right');
    map.addControl(new window.maplibregl.ScaleControl({
      maxWidth: 110
    }), 'bottom-left');
    D2.clusters.forEach(([lng, lat, count]) => {
      const el = document.createElement('div');
      const big = count >= 25;
      el.style.cssText = 'width:' + (big ? 38 : 30) + 'px;height:' + (big ? 38 : 30) + 'px;border-radius:50%;display:grid;place-items:center;font:600 ' + (big ? 14 : 12.5) + 'px var(--font-mono);color:#053B34;background:' + (big ? '#F5A524' : '#2DD4BF') + ';border:2.5px solid rgba(255,255,255,.92);box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer';
      if (big) el.style.color = '#4A2A00';
      el.textContent = count;
      el.title = count + ' vị trí trong khu vực';
      el.onclick = e => {
        e.stopPropagation();
        map.flyTo({
          center: [lng, lat],
          zoom: 12.5,
          essential: true
        });
        openClusterPopup(map, lng, lat, count);
      };
      new window.maplibregl.Marker({
        element: el
      }).setLngLat([lng, lat]).addTo(map);
    });
    locs.forEach((l, i) => {
      const el = document.createElement('div');
      el.style.cssText = 'width:34px;height:38px;display:grid;place-items:center;cursor:pointer;filter:drop-shadow(0 2px 5px rgba(0,0,0,.45))';
      el.innerHTML = '<svg width="34" height="38" viewBox="0 0 34 38"><rect x="3" y="3" width="28" height="17" rx="1.5" fill="var(--blue-500)" stroke="#fff" stroke-width="2"/><rect x="15.5" y="20" width="3" height="12" fill="#fff"/><rect x="10" y="32" width="14" height="3" rx="1.5" fill="#fff"/><path d="M9 9.5h10M9 13.5h7" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
      el.title = l.name;
      el.onclick = e => {
        e.stopPropagation();
        setSel(i);
        map.flyTo({
          center: [l.lng, l.lat],
          zoom: 12.8,
          essential: true
        });
        openPopup(map, l);
      };
      new window.maplibregl.Marker({
        element: el
      }).setLngLat([l.lng, l.lat]).addTo(map);
    });
    setReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  const focus = i => {
    setSel(i);
    const map = mapRef.current,
      l = locs[i];
    if (map) {
      map.flyTo({
        center: [l.lng, l.lat],
        zoom: l.city === 'Hà Nội' ? 12.8 : 11.5,
        essential: true
      });
      openPopup(map, l);
    }
  };
  const legendDot = (c, label) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: '.75rem',
      color: '#E2E8F0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: c
    }
  }), label);
  return /*#__PURE__*/React.createElement("section", {
    id: "map",
    style: {
      background: 'var(--muted)',
      padding: hideHead ? '0' : '88px 0 0'
    }
  }, !hideHead && /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "B\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED OOH to\xE0n qu\u1ED1c",
    sub: "L\u1ECDc theo t\u1EC9nh/th\xE0nh, lo\u1EA1i bi\u1EC3n, ng\xE2n s\xE1ch, ch\u1ECDn v\u1ECB tr\xED \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: listOpen ? '320px 1fr' : '1fr',
      height: hideHead ? 'calc(100vh - 72px)' : 600,
      minHeight: 520
    }
  }, listOpen && /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--slate-900)',
      color: '#F1F5F9',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px 12px 16px',
      borderBottom: '1px solid rgba(255,255,255,.1)',
      fontSize: '.8125rem',
      color: 'var(--slate-400)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Hi\u1EC3n th\u1ECB ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: '#fff'
    }
  }, locs.length, "/2.008"), " k\u1EBFt qu\u1EA3. Thu h\u1EB9p b\u1ED9 l\u1ECDc \u0111\u1EC3 ch\xEDnh x\xE1c h\u01A1n."), /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleList(false),
    "aria-label": "\u0110\xF3ng danh s\xE1ch",
    title: "\u0110\xF3ng danh s\xE1ch",
    style: {
      flex: 'none',
      width: 34,
      height: 34,
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-500)',
      color: '#fff',
      fontSize: '1.05rem',
      fontWeight: 700,
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,.35)'
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      minHeight: 0
    }
  }, locs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    onClick: () => focus(i),
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,.07)',
      background: sel === i ? 'rgba(54,143,255,.14)' : 'transparent',
      borderLeft: sel === i ? '3px solid var(--blue-400)' : '3px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.img,
    alt: "",
    style: {
      width: 56,
      height: 42,
      objectFit: 'cover',
      borderRadius: 2,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      alignContent: 'start',
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.875rem',
      lineHeight: 1.3
    }
  }, "\u2605 ", l.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--slate-400)'
    }
  }, l.type, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, l.size)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, (() => {
    const p = statusPillStyle(l.status);
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '.6875rem',
        fontWeight: 600,
        padding: '2px 9px',
        borderRadius: 'var(--radius-full)',
        background: p.bg,
        color: p.fg
      }
    }, p.label);
  })(), l.status !== 'booked' && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd(l);
    },
    style: {
      marginLeft: 'auto',
      height: 26,
      padding: '0 10px',
      border: '1px solid rgba(255,255,255,.25)',
      borderRadius: 2,
      background: 'transparent',
      color: '#BFDBFE',
      fontSize: '.6875rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, "+ B\xE1o gi\xE1"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: mapEl,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), !window.maplibregl && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--slate-100)',
      color: 'var(--muted-foreground)',
      fontSize: '.875rem'
    }
  }, "Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c MapLibre GL. Ki\u1EC3m tra k\u1EBFt n\u1ED1i r\u1ED3i t\u1EA3i l\u1EA1i trang."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 5,
      display: 'flex',
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid rgba(255,255,255,.25)'
    }
  }, [['satellite', 'Vệ tinh'], ['street', 'Bản đồ']].map(([m, l]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => switchBase(m),
    style: {
      height: 36,
      padding: '0 16px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: '.8125rem',
      fontWeight: 600,
      background: baseMap === m ? 'var(--primary)' : 'rgba(15,23,42,.85)',
      color: baseMap === m ? '#fff' : '#CBD5E1'
    }
  }, l))), !listOpen && /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleList(true),
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      zIndex: 6,
      height: 38,
      padding: '0 16px',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-500)',
      color: '#fff',
      fontSize: '.8125rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-lg)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1rem'
    }
  }, "\u2630"), " Danh s\xE1ch (", locs.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: listOpen ? 12 : 60,
      left: 12,
      zIndex: 5,
      background: 'rgba(15,23,42,.88)',
      borderRadius: 4,
      padding: '10px 14px',
      display: 'grid',
      gap: 8,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, legendDot('#2DD4BF', 'Còn trống'), legendDot('#F472B6', 'Đã cho thuê')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, legendDot('#2DD4BF', 'Cụm vị trí'), legendDot('#F5A524', 'Cụm lớn ≥25'), legendDot('var(--blue-500)', '★ Vị trí tiêu biểu'))))));
}
const JOURNEY = [{
  year: '2003',
  icon: 'building-2',
  title: 'Thành lập doanh nghiệp',
  desc: 'Bắt đầu từ tổ chức sự kiện, hội chợ triển lãm, tư vấn quy hoạch quảng cáo, thiết kế và in ấn.'
}, {
  year: '2005',
  icon: 'trending-up',
  title: 'Mở rộng biển quảng cáo ngoài trời',
  desc: 'Phát triển mạnh sang biển quảng cáo tấm lớn ngoài trời trên toàn quốc.'
}, {
  year: '2010s',
  icon: 'plane',
  title: 'Mở rộng sân bay và LED',
  desc: 'Đầu tư hệ thống LED, quảng cáo tại sân bay, nhà chờ, billboard và pano.'
}, {
  year: '2020s',
  icon: 'map',
  title: 'Mạng lưới toàn quốc',
  desc: 'Vận hành ~730 vị trí, 89.000 m² diện tích khai thác, phục vụ 400+ nhãn hàng.'
}, {
  year: '2026',
  icon: 'sparkles',
  title: 'Chuyển đổi số',
  desc: 'Ra mắt bản đồ vị trí và điểm AI, số hóa dữ liệu và tự động hoá báo giá.'
}];
function Journey() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '88px 0',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 56px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.75rem,3vw,2.5rem)',
      fontWeight: 700,
      letterSpacing: '.02em',
      color: 'var(--primary)'
    }
  }, "H\xC0NH TR\xCCNH 20 N\u0102M"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `repeat(${JOURNEY.length},1fr)`,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      top: 74,
      height: 2,
      background: 'var(--border)',
      zIndex: 0
    }
  }), JOURNEY.map((j, i) => /*#__PURE__*/React.createElement("div", {
    key: j.year,
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'grid',
      gap: 14,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '.9375rem',
      color: 'var(--foreground)'
    }
  }, j.year), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--blue-100)',
      color: 'var(--primary)',
      display: 'grid',
      placeItems: 'center',
      border: '3px solid #fff',
      boxShadow: '0 0 0 2px var(--border)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: j.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--primary)',
      marginTop: -4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.9375rem',
      fontWeight: 700,
      lineHeight: 1.35
    }
  }, i + 1, ". ", j.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.8125rem',
      color: 'var(--slate-600)',
      lineHeight: 1.55
    }
  }, j.desc)))))));
}
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      background: 'var(--muted)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "Gi\u1EA3i ph\xE1p OOH c\u1EE7a To\xE0n C\u1EA7u"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, D2.services.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: "svc",
    style: {
      display: 'grid',
      gap: 10,
      alignContent: 'start',
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 20px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--navy-50)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 600
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.875rem',
      color: 'var(--muted-foreground)',
      lineHeight: 1.55
    }
  }, s.desc), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: 'var(--primary)',
      cursor: 'pointer'
    }
  }, "T\xECm hi\u1EC3u \u2192"))))));
}
function Cases() {
  const D = window.TCG_DATA;
  return /*#__PURE__*/React.createElement("section", {
    id: "cases",
    style: {
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, "D\u1EF1 \xE1n & chi\u1EBFn d\u1ECBch ti\xEAu bi\u1EC3u"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      window.location.href = 'news.html';
    }
  }, "Xem t\u1EA5t c\u1EA3 \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, D.news.slice(0, 4).map(n => /*#__PURE__*/React.createElement("article", {
    key: n.title,
    style: {
      display: 'grid',
      gap: 0,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: n.img,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '16/10',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 18px',
      display: 'grid',
      gap: 8,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, n.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, n.tag)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, n.title)))))));
}
function LeadForm({
  onToast
}) {
  const [st, setSt] = React.useState('idle');
  const [ok, setOk] = React.useState(false);
  const submit = () => {
    setSt('submitting');
    setTimeout(() => {
      setSt('success');
      onToast({
        kind: 'success',
        title: 'Đã gửi yêu cầu tư vấn',
        message: 'Đội ngũ Toàn Cầu sẽ liên hệ trong 24h.'
      });
    }, 1200);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "lead",
    "data-anchor": "lien-he",
    style: {
      background: 'var(--navy-50)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: "lien-he",
    style: {
      position: 'relative',
      top: -90,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: '.9fr 1.1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.18
    }
  }, "Nh\u1EADn t\u01B0 v\u1EA5n OOH mi\u1EC5n ph\xED"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--slate-600)'
    }
  }, "\u0110\u1EC3 l\u1EA1i th\xF4ng tin, \u0111\u1ED9i ng\u0169 To\xE0n C\u1EA7u li\xEAn h\u1EC7 trong 24h."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 10
    }
  }, ['Tư vấn vị trí theo ngành hàng, có điểm AI gợi ý', 'Báo giá PDF nháp trong vài phút, 24/7', 'Khảo sát và thi công trọn gói toàn quốc', '20 năm kinh nghiệm, 400+ nhãn hàng đã hợp tác'].map(x => /*#__PURE__*/React.createElement("li", {
    key: x,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      fontWeight: 700
    }
  }, "\u2713"), x))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      padding: '14px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, [['20+', 'Năm OOH'], ['~730', 'Vị trí'], ['30+', 'Tỉnh/thành']].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.5rem',
      color: 'var(--primary)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--muted-foreground)'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.875rem',
      color: 'var(--slate-600)'
    }
  }, "C\u1EA7n t\u01B0 v\u1EA5n ngay? G\u1ECDi tr\u1EF1c ti\u1EBFp:"), /*#__PURE__*/React.createElement("a", {
    href: "tel:02439290088",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.375rem',
      fontWeight: 700,
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "024 3929 0088")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      window.location.href = 'services.html';
    }
  }, "Xem c\xE1c d\u1ECBch v\u1EE5"))), st === 'success' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 40,
      display: 'grid',
      gap: 10,
      justifyItems: 'center',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--success)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: 26,
      fontWeight: 700
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-h3)'
    }
  }, "\u0110\xE3 nh\u1EADn y\xEAu c\u1EA7u c\u1EE7a b\u1EA1n"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)'
    }
  }, "Ch\xFAng t\xF4i s\u1EBD li\xEAn h\u1EC7 trong 24h l\xE0m vi\u1EC7c. M\xE3 y\xEAu c\u1EA7u: ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600
    }
  }, "TC-2607-018")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setSt('idle')
  }, "G\u1EEDi y\xEAu c\u1EA7u kh\xE1c")) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 28,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "H\u1ECD t\xEAn",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Nguy\u1EC5n V\u0103n A"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "09xx xxx xxx"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Doanh nghi\u1EC7p"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "T\xEAn c\xF4ng ty"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "ban@congty.vn"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ng\xE0nh h\xE0ng"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "V\xED d\u1EE5: F&B, Th\u1EDDi trang, M\u1EF9 ph\u1EA9m\u2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ng\xE2n s\xE1ch"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "V\xED d\u1EE5: 50-150 tri\u1EC7u/th\xE1ng"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nhu c\u1EA7u / ghi ch\xFA"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "M\xF4 t\u1EA3 ng\u1EAFn nhu c\u1EA7u qu\u1EA3ng c\xE1o\u2026"
  }))), /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u0110\u1ED3ng \xFD nh\u1EADn li\xEAn h\u1EC7",
    checked: ok,
    onChange: setOk
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    loading: st === 'submitting',
    disabled: !ok,
    onClick: submit
  }, st === 'submitting' ? 'Đang gửi…' : 'Gửi yêu cầu tư vấn')))));
}
function CTABand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--navy-800)',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 20,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      textWrap: 'balance'
    }
  }, "S\u1EB5n s\xE0ng t\xECm v\u1ECB tr\xED OOH cho chi\u1EBFn d\u1ECBch ti\u1EBFp theo?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    size: "lg",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    size: "lg",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Y\xEAu c\u1EA7u b\xE1o gi\xE1")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      color: 'var(--slate-400)'
    }
  }, "B\u1EA1n l\xE0 ch\u1EE7 bi\u1EC3n mu\u1ED1n cho thu\xEA? S\xE0n OOH s\u1EAFp ra m\u1EAFt.")));
}
const socialCircle = {
  width: 36,
  height: 36,
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--border)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--primary)',
  cursor: 'pointer'
};
function Footer() {
  const info = (label, val) => /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      lineHeight: 1.7,
      color: 'var(--slate-700)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--foreground)'
    }
  }, label, ":"), " ", val);
  const col = (t, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1rem',
      color: 'var(--foreground)'
    }
  }, t), items.map((x, i) => typeof x === 'string' ? /*#__PURE__*/React.createElement("a", {
    key: i,
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, x) : Array.isArray(x) && typeof x[1] === 'string' && x[1].startsWith('.') ? /*#__PURE__*/React.createElement("a", {
    key: i,
    href: x[1],
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem',
      textDecoration: 'none'
    }
  }, x[0]) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem'
    }
  }, x[0]), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.0625rem',
      color: 'var(--foreground)'
    }
  }, x[1]))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: '#fff',
      borderTop: '1px solid var(--border)',
      padding: '56px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "/v1-assets/assets/logo-full.png",
    alt: "To\xE0n C\u1EA7u ADV",
    style: {
      height: 52
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1.0625rem'
    }
  }, "C\xF4ng Ty C\u1ED5 Ph\u1EA7n T\u1EADp \u0110o\xE0n Qu\u1EA3ng C\xE1o To\xE0n C\u1EA7u"), info('Trụ sở chính', '265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội, Việt Nam'), info('Hotline', '024 3929 0088'), info('Email', 'info@toancauadv.vn'), info('Thời gian làm việc', 'Giờ hành chính từ thứ 2 đến sáng thứ 7'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9375rem',
      color: 'var(--slate-700)',
      marginTop: 6
    }
  }, "Theo d\xF5i ch\xFAng t\xF4i qua:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "Facebook"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "YouTube"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "Zalo / \u0111i\u1EC7n tho\u1EA1i"
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "phone",
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 280,
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'linear-gradient(150deg,#E8F0FA,#DCE8F5 55%,#D2E1F0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(35,116,217,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(35,116,217,.07) 1px,transparent 1px)',
      backgroundSize: '40px 40px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '52%',
      top: '44%',
      transform: 'translate(-50%,-100%)'
    }
  }, /*#__PURE__*/React.createElement(NS2.MapMarker, {
    state: "selected"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      top: 12,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      padding: '10px 14px',
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.875rem'
    }
  }, "265 Th\u1EE5y Khu\xEA, T\xE2y H\u1ED3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, "Tr\u1EE5 s\u1EDF To\xE0n C\u1EA7u ADV, H\xE0 N\u1ED9i")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      bottom: 8,
      fontSize: '.6875rem',
      color: 'var(--slate-500)'
    }
  }, "B\u1EA3n \u0111\u1ED3 minh ho\u1EA1. Production: nh\xFAng Google Maps."))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 32,
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 32
    }
  }, col('Doanh nghiệp', [['Về Toàn Cầu', './about.html'], 'Khách hàng', 'Tin tức', 'Tuyển dụng', 'Liên hệ']), col('Dịch vụ', ['Quảng cáo sân bay', 'Billboard · Pano', 'Màn hình LED', 'Nhà chờ xe bus']), col('Vị trí OOH', ['Bản đồ vị trí', 'Theo tỉnh/thành', 'Vị trí còn trống']), col('Hotline', [['Tư vấn quảng cáo', '024 3929 0088'], ['Chăm sóc khách hàng', '1900 6522']])), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 18,
      display: 'flex',
      gap: 16,
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 C\xF4ng ty C\u1ED5 ph\u1EA7n T\u1EADp \u0111o\xE0n Qu\u1EA3ng c\xE1o To\xE0n C\u1EA7u"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, "Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt"), /*#__PURE__*/React.createElement("span", null, "\u0110i\u1EC1u kho\u1EA3n"))));
}
Object.assign(window, {
  MapSection,
  MapPreview,
  Journey,
  Services,
  Cases,
  LeadForm,
  CTABand,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections2.standalone.jsx
try { (() => {
const NS2 = window.ToNCUADVDesignSystem_ce468e || {};
const {
  Button,
  FilterBar,
  FilterChip,
  Select,
  LocationCard,
  CaseStudyCard,
  Field,
  Input,
  Textarea,
  Checkbox,
  MapMarker,
  MapPopup,
  StatusPill,
  AIScoreBadge,
  Toast,
  QuoteTray
} = NS2;
const D2 = window.TCG_DATA;
const ESRI_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const OSM_TILES = 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png';
function statusPillStyle(st) {
  const c = st === 'booked' ? {
    bg: 'rgba(244,114,182,.18)',
    fg: '#F472B6',
    label: 'Đã thuê'
  } : st === 'soon' ? {
    bg: 'rgba(245,158,11,.18)',
    fg: '#F59E0B',
    label: 'Sắp hết'
  } : {
    bg: 'rgba(45,212,191,.16)',
    fg: '#2DD4BF',
    label: 'Còn trống'
  };
  return c;
}
function MapPreview() {
  return /*#__PURE__*/React.createElement("section", {
    id: "map",
    style: {
      background: '#fff',
      padding: '96px 0',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("style", null, '.map-cta{transition:transform .2s var(--ease-standard),box-shadow .2s var(--ease-standard)}.map-cta:hover{transform:translateY(-2px);box-shadow:var(--shadow-lg)}.map-pulse{animation:mappulse 2s ease-in-out infinite}@keyframes mappulse{0%,100%{box-shadow:0 0 0 0 rgba(35,116,217,.45)}50%{box-shadow:0 0 0 8px rgba(35,116,217,0)}}@media (prefers-reduced-motion: reduce){.map-pulse{animation:none}}'), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: '.95fr 1.05fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 18,
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 14px',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-50)',
      color: 'var(--blue-700)',
      fontSize: '.75rem',
      fontWeight: 700,
      letterSpacing: '.06em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "map",
    size: 15
  }), "B\u1EA3n \u0111\u1ED3 tr\u1EF1c tuy\u1EBFn"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.2
    }
  }, "B\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED OOH to\xE0n qu\u1ED1c"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--slate-600)',
      lineHeight: 1.6,
      maxWidth: 460
    }
  }, "L\u1ECDc theo t\u1EC9nh/th\xE0nh, lo\u1EA1i bi\u1EC3n, ng\xE2n s\xE1ch. Xem \u0111i\u1EC3m AI v\xE0 ch\u1ECDn v\u1ECB tr\xED \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1 trong v\xE0i ph\xFAt."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, [['~730', 'Vị trí OOH'], ['30+', 'Tỉnh/thành']].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      padding: '8px 16px',
      borderRadius: 'var(--radius-full)',
      border: '1px solid var(--border)',
      background: 'var(--slate-50)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.125rem',
      color: 'var(--primary)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--muted-foreground)'
    }
  }, l)))), /*#__PURE__*/React.createElement("button", {
    className: "map-cta",
    onClick: () => {
      window.location.href = 'map.html';
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 52,
      padding: '0 24px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cta)',
      color: 'var(--cta-foreground)',
      fontWeight: 600,
      fontSize: '1rem',
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-md)'
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED ", /*#__PURE__*/React.createElement(window.Icon, {
    name: "arrow-right",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: '70%',
      height: '70%',
      left: '15%',
      top: '15%',
      background: 'var(--blue-200)',
      filter: 'blur(70px)',
      opacity: .5,
      zIndex: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'linear-gradient(160deg,#fff,var(--blue-50))',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.worldMap,
    alt: "B\u1EA3n \u0111\u1ED3 m\u1EA1ng l\u01B0\u1EDBi v\u1ECB tr\xED OOH To\xE0n C\u1EA7u",
    style: {
      width: '100%',
      display: 'block',
      mixBlendMode: 'multiply'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "map-pulse",
    style: {
      position: 'absolute',
      left: 24,
      top: 24,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 14px',
      borderRadius: 'var(--radius-full)',
      background: '#fff',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--success)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, "\u0110ang khai th\xE1c tr\u1EF1c ti\u1EBFp")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 20,
      bottom: 20,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--blue-900)',
      color: '#fff',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "sparkles",
    size: 16,
    color: "var(--blue-200)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      fontWeight: 600
    }
  }, "\u0110i\u1EC3m AI theo ng\xE0nh h\xE0ng")))));
}
function MapSection({
  onAdd,
  hideHead
}) {
  const locs = D2.locations;
  const mapEl = React.useRef(null);
  const mapRef = React.useRef(null);
  const onAddRef = React.useRef(onAdd);
  onAddRef.current = onAdd;
  const [sel, setSel] = React.useState(null);
  const [ready, setReady] = React.useState(false);
  const [baseMap, setBaseMap] = React.useState('satellite');
  const [listOpen, setListOpen] = React.useState(true);
  const toggleList = v => {
    setListOpen(v);
    setTimeout(() => {
      mapRef.current && mapRef.current.resize();
    }, 30);
  };
  const switchBase = mode => {
    setBaseMap(mode);
    const map = mapRef.current;
    if (!map) return;
    map.setLayoutProperty('esri', 'visibility', mode === 'satellite' ? 'visible' : 'none');
    map.setLayoutProperty('osm', 'visibility', mode === 'street' ? 'visible' : 'none');
  };
  const openPopup = (map, l) => {
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-sans);display:grid;gap:8px;width:230px';
    el.innerHTML = '<img src="' + l.img + '" alt="" style="width:100%;height:110px;object-fit:cover;border-radius:2px"/>' + '<strong style="font-size:14px;line-height:1.35">' + l.name + '</strong>' + '<span style="font-family:var(--font-mono);font-size:13px;color:var(--primary);font-weight:600">' + D2.fmt(l.priceN) + '</span>';
    const pill = statusPillStyle(l.status);
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:8px;align-items:center';
    row.innerHTML = '<span style="font-size:11px;font-weight:600;padding:2px 8px;border-radius:999px;background:' + pill.bg + ';color:' + (l.status === 'available' ? '#0F766E' : l.status === 'soon' ? '#92400E' : '#9D174D') + '">' + pill.label + '</span>';
    if (l.status !== 'booked') {
      const btn = document.createElement('button');
      btn.textContent = '+ Thêm báo giá';
      btn.style.cssText = 'flex:1;height:32px;border:none;border-radius:2px;background:var(--cta);color:#fff;font-weight:600;font-size:12.5px;font-family:var(--font-sans);cursor:pointer';
      btn.onclick = () => onAddRef.current && onAddRef.current(l);
      row.appendChild(btn);
    }
    el.appendChild(row);
    new window.maplibregl.Popup({
      offset: 14,
      maxWidth: '260px',
      closeOnClick: false
    }).setLngLat([l.lng, l.lat]).setDOMContent(el).addTo(map);
  };
  const openClusterPopup = (map, lng, lat, count) => {
    const near = [...locs].sort((p, q) => (p.lng - lng) ** 2 + (p.lat - lat) ** 2 - ((q.lng - lng) ** 2 + (q.lat - lat) ** 2)).slice(0, 3);
    const el = document.createElement('div');
    el.style.cssText = 'font-family:var(--font-sans);display:grid;gap:0;width:min(300px,84vw)';
    el.innerHTML = '<div style="font-weight:600;font-size:13.5px;padding:2px 0 8px">' + count + ' vị trí trong khu vực</div>';
    near.forEach(l => {
      const p = statusPillStyle(l.status);
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--border)';
      row.innerHTML = '<img src="' + l.img + '" alt="" style="width:52px;height:38px;object-fit:cover;border-radius:2px;flex:none"/>' + '<div style="display:grid;gap:2;min-width:0;flex:1">' + '<strong style="font-size:12.5px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + l.name + '</strong>' + '<span style="font-size:11px;color:var(--muted-foreground)">' + l.type + ' · <span style="font-family:var(--font-mono)">' + l.size + '</span> · <span style="font-family:var(--font-mono);color:var(--primary);font-weight:600">' + D2.fmt(l.priceN) + '</span></span>' + '</div>' + '<span style="flex:none;font-size:10px;font-weight:600;padding:2px 7px;border-radius:999px;background:' + p.bg + ';color:' + (l.status === 'available' ? '#0F766E' : l.status === 'soon' ? '#92400E' : '#9D174D') + '">' + p.label + '</span>';
      const btn = document.createElement('button');
      btn.textContent = 'Xem chi tiết vị trí';
      btn.style.cssText = 'display:none';
      row.style.cursor = 'pointer';
      row.onclick = () => openPopup(map, l);
      el.appendChild(row);
    });
    const note = document.createElement('div');
    note.style.cssText = 'font-size:11px;color:var(--muted-foreground);padding-top:8px;border-top:1px solid var(--border)';
    note.textContent = 'Dữ liệu mẫu. Bấm từng dòng để xem chi tiết, hoặc liên hệ để nhận danh sách đầy đủ.';
    el.appendChild(note);
    new window.maplibregl.Popup({
      offset: 16,
      maxWidth: 'none',
      closeOnClick: false
    }).setLngLat([lng, lat]).setDOMContent(el).addTo(map);
  };
  React.useEffect(() => {
    if (!window.maplibregl || !mapEl.current) return;
    const map = new window.maplibregl.Map({
      container: mapEl.current,
      style: {
        version: 8,
        sources: {
          esri: {
            type: 'raster',
            tiles: [ESRI_TILES],
            tileSize: 256,
            attribution: 'Tiles © Esri | Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          },
          osm: {
            type: 'raster',
            tiles: [OSM_TILES],
            tileSize: 512,
            attribution: '© OpenStreetMap contributors © CARTO'
          }
        },
        layers: [{
          id: 'esri',
          type: 'raster',
          source: 'esri'
        }, {
          id: 'osm',
          type: 'raster',
          source: 'osm',
          layout: {
            visibility: 'none'
          }
        }]
      },
      center: [105.845, 21.02],
      zoom: 10.4,
      attributionControl: {
        compact: false
      }
    });
    mapRef.current = map;
    map.addControl(new window.maplibregl.NavigationControl({
      showCompass: false
    }), 'bottom-right');
    map.addControl(new window.maplibregl.ScaleControl({
      maxWidth: 110
    }), 'bottom-left');
    D2.clusters.forEach(([lng, lat, count]) => {
      const el = document.createElement('div');
      const big = count >= 25;
      el.style.cssText = 'width:' + (big ? 38 : 30) + 'px;height:' + (big ? 38 : 30) + 'px;border-radius:50%;display:grid;place-items:center;font:600 ' + (big ? 14 : 12.5) + 'px var(--font-mono);color:#053B34;background:' + (big ? '#F5A524' : '#2DD4BF') + ';border:2.5px solid rgba(255,255,255,.92);box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer';
      if (big) el.style.color = '#4A2A00';
      el.textContent = count;
      el.title = count + ' vị trí trong khu vực';
      el.onclick = e => {
        e.stopPropagation();
        map.flyTo({
          center: [lng, lat],
          zoom: 12.5,
          essential: true
        });
        openClusterPopup(map, lng, lat, count);
      };
      new window.maplibregl.Marker({
        element: el
      }).setLngLat([lng, lat]).addTo(map);
    });
    locs.forEach((l, i) => {
      const el = document.createElement('div');
      el.style.cssText = 'width:34px;height:38px;display:grid;place-items:center;cursor:pointer;filter:drop-shadow(0 2px 5px rgba(0,0,0,.45))';
      el.innerHTML = '<svg width="34" height="38" viewBox="0 0 34 38"><rect x="3" y="3" width="28" height="17" rx="1.5" fill="var(--blue-500)" stroke="#fff" stroke-width="2"/><rect x="15.5" y="20" width="3" height="12" fill="#fff"/><rect x="10" y="32" width="14" height="3" rx="1.5" fill="#fff"/><path d="M9 9.5h10M9 13.5h7" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
      el.title = l.name;
      el.onclick = e => {
        e.stopPropagation();
        setSel(i);
        map.flyTo({
          center: [l.lng, l.lat],
          zoom: 12.8,
          essential: true
        });
        openPopup(map, l);
      };
      new window.maplibregl.Marker({
        element: el
      }).setLngLat([l.lng, l.lat]).addTo(map);
    });
    setReady(true);
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  const focus = i => {
    setSel(i);
    const map = mapRef.current,
      l = locs[i];
    if (map) {
      map.flyTo({
        center: [l.lng, l.lat],
        zoom: l.city === 'Hà Nội' ? 12.8 : 11.5,
        essential: true
      });
      openPopup(map, l);
    }
  };
  const legendDot = (c, label) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: '.75rem',
      color: '#E2E8F0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: c
    }
  }), label);
  return /*#__PURE__*/React.createElement("section", {
    id: "map",
    style: {
      background: 'var(--muted)',
      padding: hideHead ? '0' : '88px 0 0'
    }
  }, !hideHead && /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "B\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED OOH to\xE0n qu\u1ED1c",
    sub: "L\u1ECDc theo t\u1EC9nh/th\xE0nh, lo\u1EA1i bi\u1EC3n, ng\xE2n s\xE1ch, ch\u1ECDn v\u1ECB tr\xED \u0111\u1EC3 nh\u1EADn b\xE1o gi\xE1."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: listOpen ? '320px 1fr' : '1fr',
      height: hideHead ? 'calc(100vh - 72px)' : 600,
      minHeight: 520
    }
  }, listOpen && /*#__PURE__*/React.createElement("aside", {
    style: {
      background: 'var(--slate-900)',
      color: '#F1F5F9',
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px 12px 16px',
      borderBottom: '1px solid rgba(255,255,255,.1)',
      fontSize: '.8125rem',
      color: 'var(--slate-400)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "Hi\u1EC3n th\u1ECB ", /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: '#fff'
    }
  }, locs.length, "/2.008"), " k\u1EBFt qu\u1EA3. Thu h\u1EB9p b\u1ED9 l\u1ECDc \u0111\u1EC3 ch\xEDnh x\xE1c h\u01A1n."), /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleList(false),
    "aria-label": "\u0110\xF3ng danh s\xE1ch",
    title: "\u0110\xF3ng danh s\xE1ch",
    style: {
      flex: 'none',
      width: 34,
      height: 34,
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-500)',
      color: '#fff',
      fontSize: '1.05rem',
      fontWeight: 700,
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,.35)'
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      minHeight: 0
    }
  }, locs.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    onClick: () => focus(i),
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 16px',
      cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,.07)',
      background: sel === i ? 'rgba(54,143,255,.14)' : 'transparent',
      borderLeft: sel === i ? '3px solid var(--blue-400)' : '3px solid transparent'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: l.img,
    alt: "",
    style: {
      width: 56,
      height: 42,
      objectFit: 'cover',
      borderRadius: 2,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      alignContent: 'start',
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.875rem',
      lineHeight: 1.3
    }
  }, "\u2605 ", l.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--slate-400)'
    }
  }, l.type, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, l.size)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, (() => {
    const p = statusPillStyle(l.status);
    return /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: '.6875rem',
        fontWeight: 600,
        padding: '2px 9px',
        borderRadius: 'var(--radius-full)',
        background: p.bg,
        color: p.fg
      }
    }, p.label);
  })(), l.status !== 'booked' && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onAdd && onAdd(l);
    },
    style: {
      marginLeft: 'auto',
      height: 26,
      padding: '0 10px',
      border: '1px solid rgba(255,255,255,.25)',
      borderRadius: 2,
      background: 'transparent',
      color: '#BFDBFE',
      fontSize: '.6875rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer'
    }
  }, "+ B\xE1o gi\xE1"))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: mapEl,
    style: {
      position: 'absolute',
      inset: 0
    }
  }), !window.maplibregl && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      background: 'var(--slate-100)',
      color: 'var(--muted-foreground)',
      fontSize: '.875rem'
    }
  }, "Kh\xF4ng t\u1EA3i \u0111\u01B0\u1EE3c MapLibre GL. Ki\u1EC3m tra k\u1EBFt n\u1ED1i r\u1ED3i t\u1EA3i l\u1EA1i trang."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 5,
      display: 'flex',
      borderRadius: 4,
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid rgba(255,255,255,.25)'
    }
  }, [['satellite', 'Vệ tinh'], ['street', 'Bản đồ']].map(([m, l]) => /*#__PURE__*/React.createElement("button", {
    key: m,
    onClick: () => switchBase(m),
    style: {
      height: 36,
      padding: '0 16px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: '.8125rem',
      fontWeight: 600,
      background: baseMap === m ? 'var(--primary)' : 'rgba(15,23,42,.85)',
      color: baseMap === m ? '#fff' : '#CBD5E1'
    }
  }, l))), !listOpen && /*#__PURE__*/React.createElement("button", {
    onClick: () => toggleList(true),
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      zIndex: 6,
      height: 38,
      padding: '0 16px',
      border: 'none',
      borderRadius: 'var(--radius-full)',
      background: 'var(--blue-500)',
      color: '#fff',
      fontSize: '.8125rem',
      fontWeight: 600,
      fontFamily: 'var(--font-sans)',
      cursor: 'pointer',
      boxShadow: 'var(--shadow-lg)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1rem'
    }
  }, "\u2630"), " Danh s\xE1ch (", locs.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: listOpen ? 12 : 60,
      left: 12,
      zIndex: 5,
      background: 'rgba(15,23,42,.88)',
      borderRadius: 4,
      padding: '10px 14px',
      display: 'grid',
      gap: 8,
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, legendDot('#2DD4BF', 'Còn trống'), legendDot('#F472B6', 'Đã cho thuê')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, legendDot('#2DD4BF', 'Cụm vị trí'), legendDot('#F5A524', 'Cụm lớn ≥25'), legendDot('var(--blue-500)', '★ Vị trí tiêu biểu'))))));
}
const JOURNEY = [{
  year: '2003',
  icon: 'building-2',
  title: 'Thành lập doanh nghiệp',
  desc: 'Bắt đầu từ tổ chức sự kiện, hội chợ triển lãm, tư vấn quy hoạch quảng cáo, thiết kế và in ấn.'
}, {
  year: '2005',
  icon: 'trending-up',
  title: 'Mở rộng biển quảng cáo ngoài trời',
  desc: 'Phát triển mạnh sang biển quảng cáo tấm lớn ngoài trời trên toàn quốc.'
}, {
  year: '2010s',
  icon: 'plane',
  title: 'Mở rộng sân bay và LED',
  desc: 'Đầu tư hệ thống LED, quảng cáo tại sân bay, nhà chờ, billboard và pano.'
}, {
  year: '2020s',
  icon: 'map',
  title: 'Mạng lưới toàn quốc',
  desc: 'Vận hành ~730 vị trí, 89.000 m² diện tích khai thác, phục vụ 400+ nhãn hàng.'
}, {
  year: '2026',
  icon: 'sparkles',
  title: 'Chuyển đổi số',
  desc: 'Ra mắt bản đồ vị trí và điểm AI, số hóa dữ liệu và tự động hoá báo giá.'
}];
function Journey() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '88px 0',
      background: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '0 0 56px',
      textAlign: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(1.75rem,3vw,2.5rem)',
      fontWeight: 700,
      letterSpacing: '.02em',
      color: 'var(--primary)'
    }
  }, "H\xC0NH TR\xCCNH 20 N\u0102M"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: `repeat(${JOURNEY.length},1fr)`,
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '10%',
      right: '10%',
      top: 74,
      height: 2,
      background: 'var(--border)',
      zIndex: 0
    }
  }), JOURNEY.map((j, i) => /*#__PURE__*/React.createElement("div", {
    key: j.year,
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'grid',
      gap: 14,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: '.9375rem',
      color: 'var(--foreground)'
    }
  }, j.year), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--blue-100)',
      color: 'var(--primary)',
      display: 'grid',
      placeItems: 'center',
      border: '3px solid #fff',
      boxShadow: '0 0 0 2px var(--border)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: j.icon,
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--primary)',
      marginTop: -4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 6,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.9375rem',
      fontWeight: 700,
      lineHeight: 1.35
    }
  }, i + 1, ". ", j.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.8125rem',
      color: 'var(--slate-600)',
      lineHeight: 1.55
    }
  }, j.desc)))))));
}
function Services() {
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      background: 'var(--muted)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    title: "Gi\u1EA3i ph\xE1p OOH c\u1EE7a To\xE0n C\u1EA7u"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, D2.services.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    className: "svc",
    style: {
      display: 'grid',
      gap: 10,
      alignContent: 'start',
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 20px',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--navy-50)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--primary)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: s.icon,
    size: 22
  })), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-h4)',
      fontWeight: 600
    }
  }, s.name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.875rem',
      color: 'var(--muted-foreground)',
      lineHeight: 1.55
    }
  }, s.desc), /*#__PURE__*/React.createElement("a", {
    style: {
      fontSize: '.875rem',
      fontWeight: 600,
      color: 'var(--primary)',
      cursor: 'pointer'
    }
  }, "T\xECm hi\u1EC3u \u2192"))))));
}
function Cases() {
  const D = window.TCG_DATA;
  return /*#__PURE__*/React.createElement("section", {
    id: "cases",
    style: {
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: window.container
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, "D\u1EF1 \xE1n & chi\u1EBFn d\u1ECBch ti\xEAu bi\u1EC3u"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      window.location.href = 'news.html';
    }
  }, "Xem t\u1EA5t c\u1EA3 \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, D.news.slice(0, 4).map(n => /*#__PURE__*/React.createElement("article", {
    key: n.title,
    style: {
      display: 'grid',
      gap: 0,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: n.img,
    alt: "",
    style: {
      width: '100%',
      aspectRatio: '16/10',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 18px',
      display: 'grid',
      gap: 8,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, n.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      color: 'var(--primary)'
    }
  }, n.tag)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      fontWeight: 600,
      lineHeight: 1.4
    }
  }, n.title)))))));
}
function LeadForm({
  onToast
}) {
  const [st, setSt] = React.useState('idle');
  const [ok, setOk] = React.useState(false);
  const submit = () => {
    setSt('submitting');
    setTimeout(() => {
      setSt('success');
      onToast({
        kind: 'success',
        title: 'Đã gửi yêu cầu tư vấn',
        message: 'Đội ngũ Toàn Cầu sẽ liên hệ trong 24h.'
      });
    }, 1200);
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "lead",
    "data-anchor": "lien-he",
    style: {
      background: 'var(--navy-50)',
      padding: '88px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    id: "lien-he",
    style: {
      position: 'relative',
      top: -90,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gridTemplateColumns: '.9fr 1.1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      color: 'var(--primary)',
      lineHeight: 1.18
    }
  }, "Nh\u1EADn t\u01B0 v\u1EA5n OOH mi\u1EC5n ph\xED"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 'var(--text-body-lg)',
      color: 'var(--slate-600)'
    }
  }, "\u0110\u1EC3 l\u1EA1i th\xF4ng tin, \u0111\u1ED9i ng\u0169 To\xE0n C\u1EA7u li\xEAn h\u1EC7 trong 24h."), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'grid',
      gap: 10
    }
  }, ['Tư vấn vị trí theo ngành hàng, có điểm AI gợi ý', 'Báo giá PDF nháp trong vài phút, 24/7', 'Khảo sát và thi công trọn gói toàn quốc', '20 năm kinh nghiệm, 400+ nhãn hàng đã hợp tác'].map(x => /*#__PURE__*/React.createElement("li", {
    key: x,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success)',
      fontWeight: 700
    }
  }, "\u2713"), x))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      padding: '14px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, [['20+', 'Năm OOH'], ['~730', 'Vị trí'], ['30+', 'Tỉnh/thành']].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.5rem',
      color: 'var(--primary)'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      fontWeight: 600,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--muted-foreground)'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.875rem',
      color: 'var(--slate-600)'
    }
  }, "C\u1EA7n t\u01B0 v\u1EA5n ngay? G\u1ECDi tr\u1EF1c ti\u1EBFp:"), /*#__PURE__*/React.createElement("a", {
    href: "tel:02439290088",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.375rem',
      fontWeight: 700,
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "024 3929 0088")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => {
      window.location.href = 'services.html';
    }
  }, "Xem c\xE1c d\u1ECBch v\u1EE5"))), st === 'success' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 40,
      display: 'grid',
      gap: 10,
      justifyItems: 'center',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--success)',
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontSize: 26,
      fontWeight: 700
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 'var(--text-h3)'
    }
  }, "\u0110\xE3 nh\u1EADn y\xEAu c\u1EA7u c\u1EE7a b\u1EA1n"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: 'var(--muted-foreground)'
    }
  }, "Ch\xFAng t\xF4i s\u1EBD li\xEAn h\u1EC7 trong 24h l\xE0m vi\u1EC7c. M\xE3 y\xEAu c\u1EA7u: ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600
    }
  }, "TC-2607-018")), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => setSt('idle')
  }, "G\u1EEDi y\xEAu c\u1EA7u kh\xE1c")) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: 28,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14,
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "H\u1ECD t\xEAn",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "Nguy\u1EC5n V\u0103n A"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    required: true
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "09xx xxx xxx"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Doanh nghi\u1EC7p"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "T\xEAn c\xF4ng ty"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "ban@congty.vn"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ng\xE0nh h\xE0ng"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "V\xED d\u1EE5: F&B, Th\u1EDDi trang, M\u1EF9 ph\u1EA9m\u2026"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Ng\xE2n s\xE1ch"
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "V\xED d\u1EE5: 50-150 tri\u1EC7u/th\xE1ng"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nhu c\u1EA7u / ghi ch\xFA"
  }, /*#__PURE__*/React.createElement(Textarea, {
    rows: 3,
    placeholder: "M\xF4 t\u1EA3 ng\u1EAFn nhu c\u1EA7u qu\u1EA3ng c\xE1o\u2026"
  }))), /*#__PURE__*/React.createElement(Checkbox, {
    label: "\u0110\u1ED3ng \xFD nh\u1EADn li\xEAn h\u1EC7",
    checked: ok,
    onChange: setOk
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    loading: st === 'submitting',
    disabled: !ok,
    onClick: submit
  }, st === 'submitting' ? 'Đang gửi…' : 'Gửi yêu cầu tư vấn')))));
}
function CTABand() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--navy-800)',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 20,
      justifyItems: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: '#fff',
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-h2)',
      fontWeight: 600,
      textWrap: 'balance'
    }
  }, "S\u1EB5n s\xE0ng t\xECm v\u1ECB tr\xED OOH cho chi\u1EBFn d\u1ECBch ti\u1EBFp theo?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline-inverse",
    size: "lg",
    onClick: () => {
      window.location.href = 'map.html';
    }
  }, "Kh\xE1m ph\xE1 b\u1EA3n \u0111\u1ED3 v\u1ECB tr\xED"), /*#__PURE__*/React.createElement(Button, {
    variant: "cta",
    size: "lg",
    onClick: () => {
      var __c = document.getElementById('lien-he') || document.getElementById('lead'); __c ? __c.scrollIntoView({ behavior: 'smooth' }) : window.location.href = 'index.html#lien-he';
    }
  }, "Y\xEAu c\u1EA7u b\xE1o gi\xE1")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.8125rem',
      color: 'var(--slate-400)'
    }
  }, "B\u1EA1n l\xE0 ch\u1EE7 bi\u1EC3n mu\u1ED1n cho thu\xEA? S\xE0n OOH s\u1EAFp ra m\u1EAFt.")));
}
const socialCircle = {
  width: 36,
  height: 36,
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--border)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--primary)',
  cursor: 'pointer'
};
function Footer() {
  const info = (label, val) => /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: '.9375rem',
      lineHeight: 1.7,
      color: 'var(--slate-700)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--foreground)'
    }
  }, label, ":"), " ", val);
  const col = (t, items) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1rem',
      color: 'var(--foreground)'
    }
  }, t), items.map((x, i) => typeof x === 'string' ? /*#__PURE__*/React.createElement("a", {
    key: i,
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  }, x) : Array.isArray(x) && typeof x[1] === 'string' && x[1].startsWith('.') ? /*#__PURE__*/React.createElement("a", {
    key: i,
    href: x[1],
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem',
      textDecoration: 'none'
    }
  }, x[0]) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--slate-600)',
      fontSize: '.9375rem'
    }
  }, x[0]), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: '1.0625rem',
      color: 'var(--foreground)'
    }
  }, x[1]))));
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: '#fff',
      borderTop: '1px solid var(--border)',
      padding: '56px 0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.container,
      display: 'grid',
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 48,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 12,
      justifyItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources.logoFull,
    alt: "To\xE0n C\u1EA7u ADV",
    style: {
      height: 52
    }
  }), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '1.0625rem'
    }
  }, "C\xF4ng Ty C\u1ED5 Ph\u1EA7n T\u1EADp \u0110o\xE0n Qu\u1EA3ng C\xE1o To\xE0n C\u1EA7u"), info('Trụ sở chính', '265 Thụy Khuê, Phường Tây Hồ, TP Hà Nội, Việt Nam'), info('Hotline', '024 3929 0088'), info('Email', 'info@toancauadv.vn'), info('Thời gian làm việc', 'Giờ hành chính từ thứ 2 đến sáng thứ 7'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.9375rem',
      color: 'var(--slate-700)',
      marginTop: 6
    }
  }, "Theo d\xF5i ch\xFAng t\xF4i qua:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "Facebook"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "YouTube"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  }))), /*#__PURE__*/React.createElement("span", {
    style: socialCircle,
    "aria-label": "Zalo / \u0111i\u1EC7n tho\u1EA1i"
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "phone",
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: 280,
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border)',
      background: 'linear-gradient(150deg,#E8F0FA,#DCE8F5 55%,#D2E1F0)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(35,116,217,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(35,116,217,.07) 1px,transparent 1px)',
      backgroundSize: '40px 40px'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '52%',
      top: '44%',
      transform: 'translate(-50%,-100%)'
    }
  }, /*#__PURE__*/React.createElement(NS2.MapMarker, {
    state: "selected"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 12,
      top: 12,
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      padding: '10px 14px',
      display: 'grid',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: '.875rem'
    }
  }, "265 Th\u1EE5y Khu\xEA, T\xE2y H\u1ED3"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '.75rem',
      color: 'var(--muted-foreground)'
    }
  }, "Tr\u1EE5 s\u1EDF To\xE0n C\u1EA7u ADV, H\xE0 N\u1ED9i")), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 10,
      bottom: 8,
      fontSize: '.6875rem',
      color: 'var(--slate-500)'
    }
  }, "B\u1EA3n \u0111\u1ED3 minh ho\u1EA1. Production: nh\xFAng Google Maps."))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 32,
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 32
    }
  }, col('Doanh nghiệp', [['Về Toàn Cầu', './about.html'], 'Khách hàng', 'Tin tức', 'Tuyển dụng', 'Liên hệ']), col('Dịch vụ', ['Quảng cáo sân bay', 'Billboard · Pano', 'Màn hình LED', 'Nhà chờ xe bus']), col('Vị trí OOH', ['Bản đồ vị trí', 'Theo tỉnh/thành', 'Vị trí còn trống']), col('Hotline', [['Tư vấn quảng cáo', '024 3929 0088'], ['Chăm sóc khách hàng', '1900 6522']])), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--border)',
      paddingTop: 18,
      display: 'flex',
      gap: 16,
      fontSize: '.8125rem',
      color: 'var(--muted-foreground)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 C\xF4ng ty C\u1ED5 ph\u1EA7n T\u1EADp \u0111o\xE0n Qu\u1EA3ng c\xE1o To\xE0n C\u1EA7u"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, "Ch\xEDnh s\xE1ch b\u1EA3o m\u1EADt"), /*#__PURE__*/React.createElement("span", null, "\u0110i\u1EC1u kho\u1EA3n"))));
}
Object.assign(window, {
  MapSection,
  MapPreview,
  Journey,
  Services,
  Cases,
  LeadForm,
  CTABand,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections2.standalone.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AIScoreBadge = __ds_scope.AIScoreBadge;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.TypeBadge = __ds_scope.TypeBadge;

__ds_ns.CaseStudyCard = __ds_scope.CaseStudyCard;

__ds_ns.LocationCard = __ds_scope.LocationCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Skeleton = __ds_scope.Skeleton;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.ErrorState = __ds_scope.ErrorState;

__ds_ns.FilterBar = __ds_scope.FilterBar;

__ds_ns.FilterChip = __ds_scope.FilterChip;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.MapMarker = __ds_scope.MapMarker;

__ds_ns.MapPopup = __ds_scope.MapPopup;

__ds_ns.QuoteTray = __ds_scope.QuoteTray;

__ds_ns.TrustStats = __ds_scope.TrustStats;

})();
