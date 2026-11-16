/* My-Private-Space · data + admin layer.
   Reads: window.SITE_DATA -> GET /api/data -> localStorage -> DEFAULTS.
   Saves:  POST /api/data -> fallback localStorage. */
const ADMIN_PASSWORD_HASH = "b33b653a50da45bba3409e563f479875fc2e3a379d8a478bd515f5594de12200"; // default: Mazen@2026
const SESSION_KEY = "mps_admin_session";
const DATA_KEY = "mps_data_v1";

const DEFAULTS = {
  name:"مازن مدحت",
  enName:"MAZEN MEDHAT",
  eyebrow:"طالب حاسبات وذكاء اصطناعي · جامعة مدينة السادات",
  bio:"أهلاً بك في مساحتي الرقمية. أدرس بكلية الحاسبات والذكاء الاصطناعي بجامعة مدينة السادات، وأهتم بالبرمجة وبناء تجارب رقمية نظيفة وسريعة.",
  aboutText:"أنا مازن مدحت، طالب بكلية الحاسبات والذكاء الاصطناعي – جامعة مدينة السادات. أحب استكشاف التقنيات الجديدة وبناء واجهات استخدام واضحة وسلسة، وأسعى دائمًا لتطوير مهاراتي في البرمجة وحل المشكلات.",
  heroPhoto:"assets/photo5.webp",
  cvUrl:"",
  instagram:"",tiktok:"",whatsapp:"",linkedin:"",github:"",email:"mazen@example.com",
  stats:[["FCAI","الكلية"],["USC","الجامعة"],["2026","دفعة"]],
  interests:[
    ["البرمجة وحل المشكلات","fa-solid fa-code"],
    ["هياكل البيانات والخوارزميات","fa-solid fa-diagram-project"],
    ["تصميم واجهات المستخدم","fa-solid fa-wand-magic-sparkles"],
    ["الذكاء الاصطناعي وتعلّم الآلة","fa-solid fa-brain"]
  ],
  skillBars:[
    ["HTML & CSS",90],["JavaScript",80],["Python",75],["C++",70],["UI / UX Design",78],["Git & GitHub",72]
  ],
  services:[
    ["fa-solid fa-laptop-code","تطوير الويب","بناء مواقع وواجهات سريعة ومتجاوبة بمعايير حديثة."],
    ["fa-solid fa-pen-ruler","تصميم الواجهات","تصميم تجارب استخدام نظيفة وسلسة تركّز على المستخدم."],
    ["fa-solid fa-robot","الذكاء الاصطناعي","تعلّم الآلة وتحليل البيانات وبناء نماذج مبدئية."]
  ],
  timeline:[
    ["2026","الالتحاق بكلية الحاسبات والذكاء الاصطناعي","جامعة مدينة السادات — بداية المسار الأكاديمي في مجال الحاسبات."],
    ["2025","تعلّم أساسيات البرمجة","إتقان HTML و CSS و JavaScript وبناء أولى المشاريع."],
    ["2024","أول تجربة في تطوير الويب","العمل على مشاريع صغيرة وتعلّم Git وإدارة الإصدارات."]
  ],
  photos:["assets/photo1.webp","assets/photo3.webp","assets/photo4.webp","assets/photo2.webp","assets/photo5.webp"],
  projects:[
    {id:1,title:"بوابة طلاب FCAI - USC",desc:"منصة لتنظيم المحتوى الأكاديمي والروابط والموارد الطلابية.",tags:["HTML","CSS","JavaScript"],github:"",live:""},
    {id:2,title:"محاكي الخوارزميات",desc:"فكرة مشروع لعرض خطوات الخوارزميات وهياكل البيانات بصورة تفاعلية.",tags:["C++","Algorithms"],github:"",live:""},
    {id:3,title:"لوحة إدارة المهام",desc:"واجهة لإدارة المهام اليومية مع تجربة استخدام بسيطة وسريعة.",tags:["JavaScript","UI Design"],github:"",live:""}
  ]
};

const $ = id => document.getElementById(id);
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const DataStore = {
  async load(){
    if (window.SITE_DATA) return window.SITE_DATA;
    try{
      const r = await fetch("/api/data", {headers:{Accept:"application/json"}});
      if (r.ok){ const j = await r.json(); if (j && typeof j === "object") return j; }
    }catch(_){}
    try{ const ls = JSON.parse(localStorage.getItem(DATA_KEY) || "null"); if (ls) return ls; }catch(_){}
    return null;
  },
  async save(data){
    try{
      const r = await fetch("/api/data", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)});
      if (r.ok) return "server";
    }catch(_){}
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
    return "local";
  }
};

let data = structuredClone(DEFAULTS);
let admin = false;

function toast(msg){ $("toastMsg").textContent = msg; $("toast").classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(()=>$("toast").classList.remove("show"), 2600); }
function closeModal(id){ $(id).classList.remove("open"); }
function openModal(id){ $(id).classList.add("open"); }

function renderAll(){ renderHero(); renderAbout(); renderSkills(); renderGallery(); renderServices(); renderJourney(); renderProjects(); renderSocials(); renderContact(); }

function renderHero(){
  $("heroName").textContent = data.name;
  $("heroEnName").textContent = data.enName || "";
  $("heroBio").textContent = data.bio;
  $("eyebrowText").textContent = data.eyebrow || "";
  if(data.heroPhoto) $("heroPhoto").src = data.heroPhoto;
  $("cvBtn").style.display = data.cvUrl ? "inline-flex" : "none";
}

function renderAbout(){
  $("aboutBio").textContent = data.aboutText || data.bio;
  $("statRow").innerHTML = (data.stats||[]).map(([b,s])=>`<div class="stat"><b class="mono">${safe(b)}</b><small>${safe(s)}</small></div>`).join("");
  $("skillList").innerHTML = (data.interests||[]).map(([t,ic])=>`<div class="skill"><i class="${safe(ic)}"></i> ${safe(t)}</div>`).join("");
}

function renderSkills(){
  $("skillBars").innerHTML = (data.skillBars||[]).map(([t,v])=>
    `<div class="skill-bar"><div class="sb-top"><span>${safe(t)}</span><span class="mono">${Number(v)}%</span></div><div class="sb-track"><div class="sb-fill" data-w="${Number(v)}"></div></div></div>`
  ).join("");
}

function renderGallery(){
  const labels = ["A MOMENT IN THE STUDIO","CAMPUS DAYS","PORTRAIT","MIRROR MOMENT","OUTDOOR PORTRAIT"];
  $("galleryGrid").innerHTML = (data.photos||[]).map((src,i)=>
    `<article class="gallery-card" onclick="openLightbox('${src}')"><img loading="lazy" src="${src}" alt="Mazen Medhat photo ${i+1}"><div class="gallery-label"><span>${labels[i]||("MOMENT "+(i+1))}</span><span class="mono">${String(i+1).padStart(2,"0")}</span></div></article>`
  ).join("");
}

function renderServices(){
  $("servicesGrid").innerHTML = (data.services||[]).map(([ic,t,d])=>
    `<article class="service"><div class="s-ico"><i class="${safe(ic)}"></i></div><h3>${safe(t)}</h3><p>${safe(d)}</p></article>`
  ).join("");
}

function renderJourney(){
  $("timeline").innerHTML = (data.timeline||[]).map(([dt,t,d])=>
    `<div class="tl-item"><div class="tl-date mono">${safe(dt)}</div><h3>${safe(t)}</h3><p>${safe(d)}</p></div>`
  ).join("");
}

function renderProjects(){
  const list = data.projects || [];
  $("projectsGrid").innerHTML = list.length ? list.map((p,i)=>`
    <article class="project">
      <div class="project-top"><span class="mono">PROJECT / ${String(i+1).padStart(2,"0")}</span>
        <span>${admin?`<button onclick="editProject(${p.id})" aria-label="تعديل" style="background:none;border:0;color:var(--gold)"><i class="fa-solid fa-pen"></i></button> <button onclick="deleteProject(${p.id})" aria-label="حذف" style="background:none;border:0;color:#ff9d9d"><i class="fa-solid fa-trash"></i></button>`:""}</span>
      </div>
      <h3>${safe(p.title)}</h3>
      <p>${safe(p.desc)}</p>
      <div class="tags">${(p.tags||[]).map(t=>`<span class="tag">${safe(t)}</span>`).join("")}</div>
      <div class="project-actions">
        ${p.github?`<a href="${safe(p.github)}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> الكود</a>`:"<span></span>"}
        ${p.live?`<a href="${safe(p.live)}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> معاينة</a>`:"<span></span>"}
      </div>
    </article>`).join("") : `<p style="color:var(--muted)">لا توجد مشاريع بعد.</p>`;
  $("addProjectWrap").style.display = admin ? "flex" : "none";
}

function renderSocials(){
  const items = [
    ["Instagram","fa-brands fa-instagram", data.instagram, "حساب إنستجرام"],
    ["TikTok","fa-brands fa-tiktok", data.tiktok, "حساب تيك توك"],
    ["WhatsApp","fa-brands fa-whatsapp", data.whatsapp ? `https://wa.me/${String(data.whatsapp).replace(/\D/g,"")}` : "", "محادثة مباشرة"],
    ["LinkedIn","fa-brands fa-linkedin-in", data.linkedin, "الملف المهني"],
    ["GitHub","fa-brands fa-github", data.github, "المشاريع البرمجية"],
    ["Email","fa-solid fa-envelope", data.email ? `mailto:${data.email}` : "", "البريد الإلكتروني"]
  ];
  $("socialGrid").innerHTML = items.map(([n,ic,url,sub])=>`
    <a class="social" ${url?`href="${safe(url)}" target="_blank" rel="noopener"`:`aria-disabled="true" style="opacity:.6;cursor:default"`}>
      <span class="social-icon"><i class="${ic}"></i></span>
      <span><b class="mono">${n}</b><small>${url?safe(String(url).replace(/^https?:\/\//,"").replace(/^mailto:/,"")):sub}</small></span>
    </a>`).join("");
}

function renderContact(){
  const items = [
    ["fa-solid fa-envelope","البريد الإلكتروني", data.email || "—", data.email?`mailto:${data.email}`:""],
    ["fa-brands fa-whatsapp","واتساب", data.whatsapp || "—", data.whatsapp?`https://wa.me/${String(data.whatsapp).replace(/\D/g,"")}`:""],
    ["fa-solid fa-location-dot","الموقع", "مدينة السادات، مصر", ""],
    ["fa-solid fa-graduation-cap","الجامعة", "جامعة مدينة السادات", ""]
  ];
  $("contactInfo").innerHTML = items.map(([ic,t,v,href])=>`
    <a class="ci-item" ${href?`href="${safe(href)}" target="_blank" rel="noopener"`:""}>
      <span class="ci-ico"><i class="${ic}"></i></span>
      <span><b>${safe(t)}</b><small>${safe(v)}</small></span>
    </a>`).join("");
}

async function sha256(txt){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
  return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
}
function setAdmin(on){
  admin = on;
  $("adminOpen").style.display = on ? "inline-flex" : "none";
  $("adminBar").classList.toggle("show", on);
  renderProjects();
}
async function tryLogin(e){
  e.preventDefault();
  const pass = $("adminPass").value;
  if (await sha256(pass) === ADMIN_PASSWORD_HASH){
    sessionStorage.setItem(SESSION_KEY,"1");
    setAdmin(true); closeModal("loginModal"); $("adminPass").value=""; toast("تم الدخول بنجاح");
  } else { toast("كلمة المرور غير صحيحة"); }
}
function adminLogout(){ sessionStorage.removeItem(SESSION_KEY); setAdmin(false); toast("تم الخروج"); }

function openSettings(){
  if(!admin){ openModal("loginModal"); return; }
  $("sName").value=data.name; $("sEnName").value=data.enName||""; $("sBio").value=data.bio; $("sEyebrow").value=data.eyebrow||"";
  $("sInstagram").value=data.instagram; $("sTiktok").value=data.tiktok; $("sWhatsapp").value=data.whatsapp;
  $("sLinkedin").value=data.linkedin; $("sGithub").value=data.github; $("sEmail").value=data.email;
  $("sCv").value=data.cvUrl||""; $("sHero").value=data.heroPhoto||"";
  openModal("settingsModal");
}
async function saveSettings(e){
  e.preventDefault();
  data = {...data,
    name:$("sName").value.trim(), enName:$("sEnName").value.trim(), bio:$("sBio").value.trim(), eyebrow:$("sEyebrow").value.trim(),
    instagram:$("sInstagram").value.trim(), tiktok:$("sTiktok").value.trim(), whatsapp:$("sWhatsapp").value.trim(),
    linkedin:$("sLinkedin").value.trim(), github:$("sGithub").value.trim(), email:$("sEmail").value.trim(),
    cvUrl:$("sCv").value.trim(), heroPhoto:$("sHero").value.trim() || data.heroPhoto
  };
  const where = await DataStore.save(data);
  renderAll(); closeModal("settingsModal");
  toast(where==="server" ? "تم الحفظ على السيرفر" : "تم الحفظ محليًا");
}

function openProject(p=null){
  if(!admin) return openModal("loginModal");
  $("projectForm").reset();
  $("projectId").value = p?.id || "";
  $("projectModalTitle").textContent = p ? "تعديل المشروع" : "إضافة مشروع جديد";
  if(p){ $("projectTitle").value=p.title; $("projectDesc").value=p.desc; $("projectTags").value=(p.tags||[]).join(", "); $("projectGithub").value=p.github||""; $("projectLive").value=p.live||""; }
  openModal("projectModal");
}
function editProject(id){ openProject((data.projects||[]).find(p=>p.id===id)); }
async function saveProject(e){
  e.preventDefault();
  const id = $("projectId").value;
  const p = { id: id?Number(id):Date.now(), title:$("projectTitle").value.trim(), desc:$("projectDesc").value.trim(),
    tags:$("projectTags").value.split(",").map(x=>x.trim()).filter(Boolean), github:$("projectGithub").value.trim(), live:$("projectLive").value.trim() };
  data.projects = data.projects || [];
  if(id) data.projects = data.projects.map(x=>x.id===Number(id)?p:x); else data.projects.unshift(p);
  const where = await DataStore.save(data);
  renderProjects(); closeModal("projectModal");
  toast(where==="server" ? "تم حفظ المشروع" : "تم حفظ المشروع محليًا");
}
async function deleteProject(id){
  if(!confirm("هل تريد حذف هذا المشروع؟")) return;
  data.projects = (data.projects||[]).filter(p=>p.id!==id);
  await DataStore.save(data); renderProjects(); toast("تم حذف المشروع");
}

function downloadCV(){
  if(data.cvUrl){ window.open(data.cvUrl,"_blank"); return; }
  const t = `السيرة الذاتية\n${data.name} (${data.enName||""})\n\n${data.aboutText||data.bio}\n\nالمهارات: ${(data.skillBars||[]).map(s=>s[0]).join("، ")}\n\nالبريد: ${data.email||""}\n`;
  const url = URL.createObjectURL(new Blob([t],{type:"text/plain;charset=utf-8"}));
  const a = document.createElement("a"); a.href=url; a.download="Mazen-Medhat-CV.txt"; a.click(); URL.revokeObjectURL(url);
}

function sendMessage(e){
  e.preventDefault();
  const subject = $("cSubject").value.trim();
  const body = `الاسم: ${$("cName").value}\nالبريد: ${$("cEmail").value}\n\n${$("cMessage").value}`;
  if(data.email){ location.href = `mailto:${data.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }
  toast("تم تجهيز رسالتك — سيتم فتح البريد");
  e.target.reset();
}

function openLightbox(src){ $("lbImg").src=src; $("lightbox").classList.add("open"); }
function closeLightbox(){ $("lightbox").classList.remove("open"); }

(async function init(){
  const loaded = await DataStore.load();
  if(loaded) data = {...DEFAULTS, ...loaded};
  renderAll();
  $("year").textContent = new Date().getFullYear();

  if(sessionStorage.getItem(SESSION_KEY)==="1") setAdmin(true);

  let clicks=0, timer=null;
  $("brand").addEventListener("click", ()=>{
    clicks++; clearTimeout(timer); timer=setTimeout(()=>clicks=0,700);
    if(clicks>=3){ clicks=0; admin?adminLogout():openModal("loginModal"); }
  });
  document.addEventListener("keydown", e=>{
    if(e.shiftKey && (e.key==="A"||e.key==="a")){ e.preventDefault(); admin?adminLogout():openModal("loginModal"); }
  });
  if(location.hash==="#admin" && !admin) openModal("loginModal");

  document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{ if(e.target===m) m.classList.remove("open"); }));
  $("lightbox").addEventListener("click",e=>{ if(e.target.id==="lightbox") closeLightbox(); });
  document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeLightbox(); document.querySelectorAll(".modal.open").forEach(m=>m.classList.remove("open")); } });

  const nav=$("nav"), prog=$("progress"), toTop=$("toTop");
  const sections=[...document.querySelectorAll("section[id]")], navA=[...document.querySelectorAll(".nav-links a")];
  const onScroll=()=>{
    nav.classList.toggle("scrolled", scrollY>20);
    toTop.classList.toggle("show", scrollY>600);
    const h=document.documentElement.scrollHeight-innerHeight; prog.style.width=(h>0?(scrollY/h*100):0)+"%";
    let cur=""; sections.forEach(s=>{ if(scrollY>=s.offsetTop-140) cur=s.id; });
    navA.forEach(a=>a.classList.toggle("active", a.getAttribute("href")==="#"+cur));
  };
  addEventListener("scroll", onScroll, {passive:true}); onScroll();

  const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){
    en.target.classList.add("visible");
    en.target.querySelectorAll(".sb-fill").forEach(f=>f.style.width=f.dataset.w+"%");
    io.unobserve(en.target);
  }}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  $("menuBtn").addEventListener("click", ()=>{
    const t=["about","skills","gallery","services","journey","projects","contact"], cur=t.findIndex(id=>location.hash==="#"+id);
    location.hash="#"+t[(cur+1)%t.length];
  });

  (()=>{ const c=$("stars"), ctx=c.getContext("2d"); let w,h,dpr,pts=[];
    function resize(){ dpr=Math.min(devicePixelRatio||1,1.5); w=innerWidth; h=innerHeight; c.width=w*dpr; c.height=h*dpr; c.style.width=w+"px"; c.style.height=h+"px"; ctx.setTransform(dpr,0,0,dpr,0,0);
      const n=Math.min(Math.floor(w*h/16000),110); pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.3,a:Math.random()*.6+.2,s:Math.random()*.25+.05})); }
    function draw(){ ctx.clearRect(0,0,w,h); for(const p of pts){ p.y-=p.s; if(p.y<0){p.y=h;p.x=Math.random()*w;} ctx.globalAlpha=p.a; ctx.fillStyle="#e9d9a8"; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,7); ctx.fill(); } ctx.globalAlpha=1; requestAnimationFrame(draw); }
    resize(); addEventListener("resize",resize); draw();
  })();
})();
