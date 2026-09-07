(() => {
  const SEASON_YEAR = 2027;

  document.getElementById('seasonLabel').textContent = SEASON_YEAR;

  function tick(){
    const now = new Date();
    const target = new Date(`${SEASON_YEAR}-01-01T00:00:00-06:00`);
    let diff = Math.max(0,target-now);
    const d = Math.floor(diff/86400000); diff%=86400000;
    const h = Math.floor(diff/3600000); diff%=3600000;
    const m = Math.floor(diff/60000); diff%=60000;
    const s = Math.floor(diff/1000);
    document.getElementById('days').textContent = d;
    document.getElementById('hours').textContent = String(h).padStart(2,'0');
    document.getElementById('mins').textContent = String(m).padStart(2,'0');
    document.getElementById('secs').textContent = String(s).padStart(2,'0');
  }
  tick(); setInterval(tick,1000);

  const ids = ['hitsInput','ocInput','leadInput','tierInput','eventInput','manualInput','perfectInput','ocCleanInput','optionalInput'];
  ids.forEach(id => document.getElementById(id).addEventListener('input',calc));
  ids.forEach(id => document.getElementById(id).addEventListener('change',calc));

  function hitMilestone(h){
    if(h>=1500) return 25;
    if(h>=1000) return 15;
    if(h>=750) return 10;
    if(h>=500) return 5;
    if(h>=250) return 2;
    return 0;
  }
  function calc(){
    const hits = +document.getElementById('hitsInput').value||0;
    const oc = +document.getElementById('ocInput').value||0;
    const lead = +document.getElementById('leadInput').value||0;
    const tier = +document.getElementById('tierInput').value||0;
    const events = +document.getElementById('eventInput').value||0;
    const manual = +document.getElementById('manualInput').value||0;
    const perfect = document.getElementById('perfectInput').checked ? 15 : 0;
    const clean = document.getElementById('ocCleanInput').checked ? 2 : 0;
    const optional = document.getElementById('optionalInput').checked && perfect ? 5 : 0;

    const h = hitMilestone(hits);
    const o = (oc>=6 ? 3 : 0) + clean;
    const e = Math.max(0,events);
    const l = Math.max(0,lead);
    const p = perfect + optional;
    const total = h + tier + o + e + l + manual + p;

    document.getElementById('meritScore').textContent = total;
    document.getElementById('bHits').textContent = `+${h}`;
    document.getElementById('bTier').textContent = `+${tier}`;
    document.getElementById('bOc').textContent = `+${o}`;
    document.getElementById('bEvent').textContent = `+${e}`;
    document.getElementById('bLead').textContent = `+${l}`;
    document.getElementById('bPerfect').textContent = `+${p}`;
    document.getElementById('bManual').textContent = `+${manual}`;
  }
  calc();

  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})
    },{threshold:.08});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
  }
})();
