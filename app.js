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
  heroPhoto:"assets/hero-cutout.png",
  heroWord:"WELCOME",
  cvUrl:"",
  instagram:"",tiktok:"",whatsapp:"",linkedin:"",github:"",email:"mazen@example.com",
  texts:{
    btnProjects:"اكتشف مشاريعي",
    btnContact:"خلّينا نتواصل",
    aboutCardTitle:"من أنا؟",
    goalCardTitle:"هدفي",
    goalText:"أن أبني مسارًا مهنيًا في مجال الذكاء الاصطناعي وتطوير البرمجيات، وأن أشارك في مشاريع حقيقية تضيف قيمة، مع تعلّم مستمر واهتمام بالتفاصيل وتجربة المستخدم.",
    formTitle:"أرسل لي رسالة",
    formSub:"سأرد عليك في أقرب وقت ممكن.",
    nameplateSub:"Personal Portfolio"
  },
  sections:{
    about:{kicker:"01 / ABOUT ME",t1:"نبذة",t2:"عنّي",sub:"مساحة بسيطة للتعريف بي وباهتماماتي وأهدافي في مجال الحاسبات والذكاء الاصطناعي."},
    skills:{kicker:"02 / SKILLS",t1:"مهاراتي",t2:"وقدراتي",sub:"مجموعة المهارات التقنية التي أعمل على تطويرها بشكل مستمر."},
    gallery:{kicker:"03 / PHOTO JOURNAL",t1:"لحظات",t2:"من رحلتي",sub:"مجموعة من الصور، مع إمكانية التعديل والإضافة من لوحة التحكم."},
    services:{kicker:"04 / SERVICES",t1:"ما",t2:"أقدّمه",sub:"مجالات العمل التي أحبّها وأركّز فيها خلال مشاريعي."},
    journey:{kicker:"05 / MY JOURNEY",t1:"رحلتي",t2:"العلمية",sub:"محطات مختصرة في مساري الأكاديمي والمهني."},
    projects:{kicker:"06 / SELECTED WORK",t1:"مشاريعي",t2:"وأعمالي",sub:"أضف مشاريعك وروابطها، وسيتم عرضها تلقائيًا في هذه المساحة."},
    contact:{kicker:"07 / LET'S CONNECT",t1:"تواصل",t2:"معي",sub:"يمكنك الوصول إليّ من خلال حساباتي، أو إرسال رسالة مباشرة."}
  },
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
  photos:[
    {src:"assets/photo1.webp",label:"A MOMENT IN THE STUDIO"},
    {src:"assets/photo3.webp",label:"CAMPUS DAYS"},
    {src:"assets/photo4.webp",label:"PORTRAIT"},
    {src:"assets/photo2.webp",label:"MIRROR MOMENT"},
    {src:"assets/photo5.webp",label:"OUTDOOR PORTRAIT"}
  ],
  projects:[
    {id:1,title:"موقعي الشخصي (Portfolio)",desc:"موقع شخصي احترافي بواجهة عربية (RTL) + لوحة تحكم محمية بكلمة سر لتعديل كل المحتوى، مع طبقة بيانات جاهزة للربط بـ Vercel.",tags:["HTML","CSS","JavaScript","RTL"],github:"https://github.com/mazenasc3-cmd/My-Private-Space",live:"https://mazenasc3-cmd.github.io/My-Private-Space/",image:"assets/shot-portfolio.webp"},
    {id:2,title:"موقع دار روضة المحبين",desc:"موقع لدار تحفيظ القرآن الكريم: الخاتمون، الحفلات، الأخبار، ومساعد ذكي للأسئلة في القرآن والتجويد والسنة، مع تحديث فوري للبيانات.",tags:["HTML","JavaScript","Firebase","Vercel"],github:"https://github.com/mazenasc3-cmd/rawdat-almuhibbin-",live:"https://rawdat-almuhibbin.vercel.app",image:"assets/shot-rawdat.webp"},
    {id:3,title:"بوابة طلاب FCAI - USC",desc:"منصة لتنظيم المحتوى الأكاديمي والروابط والموارد الطلابية.",tags:["HTML","CSS","JavaScript"],github:"",live:""},
    {id:4,title:"محاكي الخوارزميات",desc:"فكرة مشروع لعرض خطوات الخوارزميات وهياكل البيانات بصورة تفاعلية.",tags:["C++","Algorithms"],github:"",live:""}
  ]
};

const $ = id => document.getElementById(id);
const safe = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const DataStore = {
  async load(){
    if (window.SITE_DATA) return window.SITE_DATA;
    try{
      const r = await fetch("/api/data", {headers:{Accept:"application/json"}});
      if (r.ok){ const j = await r.json(); if (j && typeof j === "object" && Object.keys(j).length) return j; }
    }catch(_){}
    try{ const ls = JSON.parse(localStorage.getItem(DATA_KEY) || "null"); if (ls) return ls; }catch(_){}
    return null;
  },
  async save(data){
    try{
      const r = await fetch("/api/data", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({pass:adminPass, data})});
      if (r.ok) return "server";
    }catch(_){}
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
    return "local";
  }
};

let data = structuredClone(DEFAULTS);
let admin = false;
let adminPass = "";

function toast(msg){ $("toastMsg").textContent = msg; $("toast").classList.add("show"); clearTimeout(toast._t); toast._t = setTimeout(()=>$("toast").classList.remove("show"), 2600); }
function closeModal(id){ $(id).classList.remove("open"); }
function openModal(id){ $(id).classList.add("open"); }

function renderAll(){ renderHero(); renderAbout(); renderSkills(); renderGallery(); renderServices(); renderJourney(); renderProjects(); renderSocials(); renderContact(); }

function renderTexts(){
  const t = data.texts || {};
  const set=(id,v)=>{ const el=$(id); if(el) el.textContent = v ?? ""; };
  set("heroName", data.name);
  set("heroEnName", data.enName||"");
  set("heroBio", data.bio);
  set("eyebrowText", data.eyebrow||"");
  set("btnProjects", t.btnProjects||"");
  set("btnContact", t.btnContact||"");
  set("aboutCardTitle", t.aboutCardTitle||"");
  set("goalCardTitle", t.goalCardTitle||"");
  set("goalText", t.goalText||"");
  set("formTitle", t.formTitle||"");
  set("formSub", t.formSub||"");
  set("nameplateSub", t.nameplateSub||"");
  $("nameplateSub").textContent = t.nameplateSub||"";
  document.querySelector(".hero-nameplate b").textContent = data.enName||"";
  const word = document.querySelector(".welcome-word"); if(word) word.textContent = data.heroWord || "WELCOME";
  if(data.heroPhoto) $("heroPhoto").src = data.heroPhoto;
  $("cvBtn").style.display = data.cvUrl ? "inline-flex" : "none";
}

function renderSections(){
  for(const [id,sec] of Object.entries(data.sections||{})){
    const set=(suf,v)=>{ const el=$(id+suf); if(el) el.textContent = v ?? ""; };
    set("Kicker",sec.kicker); set("T1",sec.t1); set("T2",sec.t2); set("Sub",sec.sub);
  }
}

function renderHero(){ renderTexts(); renderSections(); }

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
  const photos = (data.photos||[]).map(p => typeof p==="string" ? {src:p,label:""} : p);
  $("galleryGrid").innerHTML = photos.map((p,i)=>`
    <article class="gallery-card" onclick="openLightbox('${p.src}')">
      <img loading="lazy" src="${p.src}" alt="Mazen Medhat photo ${i+1}">
      <div class="gallery-label"><span>${safe(p.label||("MOMENT "+(i+1)))}</span><span class="mono">${String(i+1).padStart(2,"0")}</span></div>
      ${admin?`<button class="photo-del" title="حذف الصورة" onclick="event.stopPropagation();deletePhoto(${i})"><i class="fa-solid fa-trash"></i></button>`:""}
    </article>`).join("");
  const wrap=$("addPhotoWrap"); if(wrap) wrap.style.display = admin ? "flex" : "none";
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
      ${p.image?`<div class="project-thumb"><img loading="lazy" src="${safe(p.image)}" alt="${safe(p.title)}"></div>`:""}
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
    sessionStorage.setItem(SESSION_KEY+"_p", pass);
    adminPass = pass;
    setAdmin(true); closeModal("loginModal"); $("adminPass").value=""; toast("تم الدخول بنجاح");
  } else { toast("كلمة المرور غير صحيحة"); }
}
function adminLogout(){ sessionStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY+"_p"); adminPass=""; setAdmin(false); toast("تم الخروج"); }

let draft = null;

function esc(v){ return String(v??"").replace(/"/g,"&quot;"); }

function openSettings(){
  if(!admin){ openModal("loginModal"); return; }
  draft = structuredClone(data);
  fillGeneral();
  renderSectionEditors();
  renderSkillEditors();
  renderInterestEditors();
  renderServiceEditors();
  renderTimelineEditors();
  renderPhotoEditors();
  renderHeroPick();
  openModal("settingsModal");
}

function fillGeneral(){
  $("sName").value=draft.name||""; $("sEnName").value=draft.enName||"";
  $("sBio").value=draft.bio||""; $("sAbout").value=draft.aboutText||"";
  $("sEyebrow").value=draft.eyebrow||""; $("sHeroWord").value=draft.heroWord||"WELCOME";
  $("sBtnProjects").value=draft.texts?.btnProjects||""; $("sBtnContact").value=draft.texts?.btnContact||"";
  $("sCv").value=draft.cvUrl||""; $("sNameplateSub").value=draft.texts?.nameplateSub||"";
  $("sHero").value=draft.heroPhoto||"";
  $("sAboutCardTitle").value=draft.texts?.aboutCardTitle||"";
  $("sGoalCardTitle").value=draft.texts?.goalCardTitle||"";
  $("sGoalText").value=draft.texts?.goalText||"";
  $("sFormTitle").value=draft.texts?.formTitle||"";
  $("sFormSub").value=draft.texts?.formSub||"";
  $("sInstagram").value=draft.instagram||""; $("sTiktok").value=draft.tiktok||"";
  $("sWhatsapp").value=draft.whatsapp||""; $("sLinkedin").value=draft.linkedin||"";
  $("sGithub").value=draft.github||""; $("sEmail").value=draft.email||"";
}

const SECTION_LABELS = {about:"نبذة عني",skills:"المهارات",gallery:"معرض الصور",services:"الخدمات",journey:"الرحلة العلمية",projects:"المشاريع",contact:"تواصل معي"};
function renderSectionEditors(){
  $("sectionEditors").innerHTML = Object.entries(draft.sections||{}).map(([id,sec])=>`
    <div class="repeat-item">
      <b style="display:block;margin-bottom:12px;color:var(--gold2)">${SECTION_LABELS[id]||id}</b>
      <div class="field-row">
        <div class="field"><label class="mini-label">Kicker</label><input data-sec="${id}" data-k="kicker" value="${esc(sec.kicker)}"></div>
        <div class="field"><label class="mini-label">الوصف</label><input data-sec="${id}" data-k="sub" value="${esc(sec.sub)}"></div>
      </div>
      <div class="field-row">
        <div class="field"><label class="mini-label">الكلمة الأولى</label><input data-sec="${id}" data-k="t1" value="${esc(sec.t1)}"></div>
        <div class="field"><label class="mini-label">الكلمة الذهبية</label><input data-sec="${id}" data-k="t2" value="${esc(sec.t2)}"></div>
      </div>
    </div>`).join("");
  $("sectionEditors").addEventListener("input", e=>{
    const el=e.target; if(el.dataset.sec){ draft.sections[el.dataset.sec][el.dataset.k]=el.value; }
  });
}

function renderSkillEditors(){
  $("skillEditors").innerHTML = (draft.skillBars||[]).map(([t,v],i)=>`
    <div class="repeat-item">
      <button type="button" class="rm" onclick="rmSkill(${i})">×</button>
      <div class="grid-2">
        <div><label class="mini-label">اسم المهارة</label><input data-skill="${i}" data-k="name" value="${esc(t)}"></div>
        <div><label class="mini-label">النسبة</label>
          <div class="range-row"><input type="range" min="0" max="100" value="${Number(v)}" data-skill="${i}" data-k="val"><span class="range-val">${Number(v)}%</span></div>
        </div>
      </div>
    </div>`).join("");
  $("skillEditors").addEventListener("input", e=>{
    const el=e.target; const i=el.dataset.skill; if(i===undefined) return;
    if(el.dataset.k==="name") draft.skillBars[i][0]=el.value;
    else { draft.skillBars[i][1]=Number(el.value); el.closest(".range-row").querySelector(".range-val").textContent=el.value+"%"; }
  });
}
function addSkill(){ draft.skillBars.push(["مهارة جديدة",50]); renderSkillEditors(); }
function rmSkill(i){ draft.skillBars.splice(i,1); renderSkillEditors(); }

function renderInterestEditors(){
  $("interestEditors").innerHTML = (draft.interests||[]).map(([t,ic],i)=>`
    <div class="repeat-item">
      <button type="button" class="rm" onclick="rmInterest(${i})">×</button>
      <div class="grid-2">
        <div><label class="mini-label">النص</label><input data-int="${i}" data-k="t" value="${esc(t)}"></div>
        <div><label class="mini-label">أيقونة (Font Awesome)</label><input data-int="${i}" data-k="ic" value="${esc(ic)}"></div>
      </div>
    </div>`).join("");
  $("interestEditors").addEventListener("input", e=>{
    const el=e.target; const i=el.dataset.int; if(i===undefined) return;
    draft.interests[i][el.dataset.k==="t"?0:1]=el.value;
  });
}
function addInterest(){ draft.interests.push(["نقطة جديدة","fa-solid fa-star"]); renderInterestEditors(); }
function rmInterest(i){ draft.interests.splice(i,1); renderInterestEditors(); }

function renderServiceEditors(){
  $("serviceEditors").innerHTML = (draft.services||[]).map(([ic,t,d],i)=>`
    <div class="repeat-item">
      <button type="button" class="rm" onclick="rmService(${i})">×</button>
      <div class="grid-2">
        <div><label class="mini-label">الأيقونة</label><input data-svc="${i}" data-k="ic" value="${esc(ic)}"></div>
        <div><label class="mini-label">العنوان</label><input data-svc="${i}" data-k="t" value="${esc(t)}"></div>
      </div>
      <div class="field"><label class="mini-label">الوصف</label><input data-svc="${i}" data-k="d" value="${esc(d)}"></div>
    </div>`).join("");
  $("serviceEditors").addEventListener("input", e=>{
    const el=e.target; const i=el.dataset.svc; if(i===undefined) return;
    const k={ic:0,t:1,d:2}[el.dataset.k]; draft.services[i][k]=el.value;
  });
}
function addService(){ draft.services.push(["fa-solid fa-star","خدمة جديدة","وصف الخدمة."]); renderServiceEditors(); }
function rmService(i){ draft.services.splice(i,1); renderServiceEditors(); }

function renderTimelineEditors(){
  $("timelineEditors").innerHTML = (draft.timeline||[]).map(([dt,t,d],i)=>`
    <div class="repeat-item">
      <button type="button" class="rm" onclick="rmTimeline(${i})">×</button>
      <div class="grid-2">
        <div><label class="mini-label">السنة/التاريخ</label><input data-tl="${i}" data-k="dt" value="${esc(dt)}"></div>
        <div><label class="mini-label">العنوان</label><input data-tl="${i}" data-k="t" value="${esc(t)}"></div>
      </div>
      <div class="field"><label class="mini-label">الوصف</label><input data-tl="${i}" data-k="d" value="${esc(d)}"></div>
    </div>`).join("");
  $("timelineEditors").addEventListener("input", e=>{
    const el=e.target; const i=el.dataset.tl; if(i===undefined) return;
    const k={dt:0,t:1,d:2}[el.dataset.k]; draft.timeline[i][k]=el.value;
  });
}
function addTimeline(){ draft.timeline.push(["2026","محطة جديدة","وصف المحطة."]); renderTimelineEditors(); }
function rmTimeline(i){ draft.timeline.splice(i,1); renderTimelineEditors(); }

function normalizePhotos(list){ return (list||[]).map(p=> typeof p==="string"?{src:p,label:""}:p); }
function renderPhotoEditors(){
  draft.photos = normalizePhotos(draft.photos);
  $("photoEditors").innerHTML = draft.photos.map((p,i)=>`
    <div class="repeat-item" style="display:flex;gap:14px;align-items:center">
      <img src="${esc(p.src)}" style="width:56px;height:70px;object-fit:cover;border-radius:10px;border:1px solid var(--line2)" alt="">
      <div style="flex:1">
        <div class="field" style="margin:0 0 8px"><label class="mini-label">رابط الصورة</label><input data-ph="${i}" data-k="src" value="${esc(p.src)}"></div>
        <div class="field" style="margin:0"><label class="mini-label">التسمية</label><input data-ph="${i}" data-k="label" value="${esc(p.label)}"></div>
      </div>
      <button type="button" class="rm" style="position:static" onclick="rmPhotoEditor(${i})">×</button>
    </div>`).join("");
  $("photoEditors").addEventListener("input", e=>{
    const el=e.target; const i=el.dataset.ph; if(i===undefined) return;
    draft.photos[i][el.dataset.k]=el.value;
  });
}
function addPhoto(){ draft.photos=normalizePhotos(draft.photos); draft.photos.push({src:"assets/photo1.webp",label:"MOMENT"}); renderPhotoEditors(); renderPhotoPool(); }
function rmPhotoEditor(i){ draft.photos.splice(i,1); renderPhotoEditors(); renderPhotoPool(); }

function renderPhotoPool(){
  const all = [...new Set(["assets/hero-cutout.png", ...normalizePhotos(draft.photos).map(p=>p.src)])];
  const html = all.map(src=>`<img src="${esc(src)}" title="استخدام كصورة هيرو" onclick="pickHero('${esc(src)}')" alt="">`).join("");
  ["photoPool","heroPick"].forEach(id=>{ const el=$(id); if(el) el.innerHTML=html; });
}
function renderHeroPick(){ renderPhotoPool(); }
function pickHero(src){ $("sHero").value=src; toast("تم اختيار صورة الهيرو"); }

function collectGeneral(){
  draft.name=$("sName").value.trim(); draft.enName=$("sEnName").value.trim();
  draft.bio=$("sBio").value.trim(); draft.aboutText=$("sAbout").value.trim();
  draft.eyebrow=$("sEyebrow").value.trim(); draft.heroWord=$("sHeroWord").value.trim()||"WELCOME";
  draft.cvUrl=$("sCv").value.trim(); draft.heroPhoto=$("sHero").value.trim()||draft.heroPhoto;
  draft.instagram=$("sInstagram").value.trim(); draft.tiktok=$("sTiktok").value.trim();
  draft.whatsapp=$("sWhatsapp").value.trim(); draft.linkedin=$("sLinkedin").value.trim();
  draft.github=$("sGithub").value.trim(); draft.email=$("sEmail").value.trim();
  draft.texts = {...(draft.texts||{}),
    btnProjects:$("sBtnProjects").value.trim(), btnContact:$("sBtnContact").value.trim(),
    nameplateSub:$("sNameplateSub").value.trim(), aboutCardTitle:$("sAboutCardTitle").value.trim(),
    goalCardTitle:$("sGoalCardTitle").value.trim(), goalText:$("sGoalText").value.trim(),
    formTitle:$("sFormTitle").value.trim(), formSub:$("sFormSub").value.trim()
  };
}

async function saveAll(){
  collectGeneral();
  data = structuredClone(draft);
  const where = await DataStore.save(data);
  renderAll(); closeModal("settingsModal");
  toast(where==="server" ? "تم الحفظ على السيرفر" : "تم الحفظ محليًا");
}

async function resetData(){
  if(!confirm("استعادة البيانات الافتراضية؟ سيتم فقدان تعديلاتك.")) return;
  data = structuredClone(DEFAULTS);
  await DataStore.save(data); renderAll(); closeModal("settingsModal"); toast("تم استعادة الافتراضي");
}

async function deletePhoto(i){
  if(!confirm("حذف هذه الصورة من المعرض؟")) return;
  data.photos = normalizePhotos(data.photos); data.photos.splice(i,1);
  await DataStore.save(data); renderGallery(); toast("تم حذف الصورة");
}
function openPhoto(){ if(!admin) return openModal("loginModal"); openSettings(); switchTab("photos"); addPhoto(); }

function switchTab(name){
  document.querySelectorAll("#adminTabs .tab").forEach(t=>t.classList.toggle("active", t.dataset.tab===name));
  document.querySelectorAll(".tab-panel").forEach(p=>p.classList.toggle("active", p.id==="panel-"+name));
}

function openProject(p=null){
  if(!admin) return openModal("loginModal");
  $("projectForm").reset();
  $("projectId").value = p?.id || "";
  $("projectModalTitle").textContent = p ? "تعديل المشروع" : "إضافة مشروع جديد";
  if(p){ $("projectTitle").value=p.title; $("projectDesc").value=p.desc; $("projectTags").value=(p.tags||[]).join(", "); $("projectGithub").value=p.github||""; $("projectLive").value=p.live||""; $("projectImage").value=p.image||""; }
  renderProjectImagePick();
  openModal("projectModal");
}

function renderProjectImagePick(){
  const pick=$("projectImagePick"); if(!pick) return;
  const srcs=[...new Set(["assets/shot-portfolio.webp","assets/shot-rawdat.webp", ...normalizePhotos(data.photos).map(p=>p.src)])];
  pick.innerHTML = srcs.map(src=>`<img src="${esc(src)}" title="استخدام هذه الصورة" onclick="document.getElementById('projectImage').value='${esc(src)}'" alt="">`).join("");
}
function editProject(id){ openProject((data.projects||[]).find(p=>p.id===id)); }
async function saveProject(e){
  e.preventDefault();
  const id = $("projectId").value;
  const p = { id: id?Number(id):Date.now(), title:$("projectTitle").value.trim(), desc:$("projectDesc").value.trim(),
    tags:$("projectTags").value.split(",").map(x=>x.trim()).filter(Boolean), github:$("projectGithub").value.trim(),
    live:$("projectLive").value.trim(), image:$("projectImage").value.trim() };
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

  if(sessionStorage.getItem(SESSION_KEY)==="1"){ adminPass = sessionStorage.getItem(SESSION_KEY+"_p") || ""; setAdmin(true); }

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
  $("adminTabs").addEventListener("click", e=>{ const t=e.target.closest(".tab"); if(t) switchTab(t.dataset.tab); });
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
