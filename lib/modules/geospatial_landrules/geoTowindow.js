/**
 * Universal geoTowindow.js
 * Works in Node.js and browser environments
 * Supports Province → District → Sector → Cell → Village hierarchy
 */
let geoData = null;
const GEO_VERSION = "1.0.0";

async function loadLocations() {
  if (geoData) return geoData;

  try {
    if (typeof window === "undefined") {
      // Node.js environment
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');

      // Properly convert file URL to OS path
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filePath = path.join(__dirname, 'locations.json');

      const jsonText = fs.readFileSync(filePath, 'utf8');
      geoData = JSON.parse(jsonText);
      console.log("✅ Loaded geo data (Node mode).");
    } else {
      // Browser environment
      const res = await fetch('./locations.json'); // relative to current folder
      geoData = await res.json();
      console.log("✅ Perfect Loaded geo data (Browser mode).");
    }
    return geoData;
  } catch (err) {
    console.error("❌ Failed to load geo data:", err);
    return null;
  }
}

// ------------------------
// Location accessors
// ------------------------
export async function getProvinces() {
  const data = await loadLocations();
  return data?.provinces?.map(p => p.name) || [];
}

export async function getDistricts(provinceName) {
  const data = await loadLocations();
  const province = data?.provinces?.find(p => p.name === provinceName);
  return province?.districts?.map(d => d.name) || [];
}

export async function getSectors(provinceName, districtName) {
  const data = await loadLocations();
  const province = data?.provinces?.find(p => p.name === provinceName);
  const district = province?.districts?.find(d => d.name === districtName);
  return district?.sectors?.map(s => s.name) || [];
}

export async function getCells(provinceName, districtName, sectorName) {
  const data = await loadLocations();
  const province = data?.provinces?.find(p => p.name === provinceName);
  const district = province?.districts?.find(d => d.name === districtName);
  const sector = district?.sectors?.find(s => s.name === sectorName);
  return sector?.cells?.map(c => c.name) || [];
}

export async function getVillages(provinceName, districtName, sectorName, cellName) {
  const data = await loadLocations();
  const province = data?.provinces?.find(p => p.name === provinceName);
  const district = province?.districts?.find(d => d.name === districtName);
  const sector = district?.sectors?.find(s => s.name === sectorName);
  const cell = sector?.cells?.find(c => c.name === cellName);
  return cell?.villages?.map(v => v.name) || [];
}

// ------------------------
// Browser-only chain dropdown binder
// ------------------------
export async function bindChainDropdowns({ provinceId, districtId, sectorId, cellId, villageId }) {
  if (typeof window === "undefined") return;

  const provinceSelect = document.getElementById(provinceId);
  const districtSelect = document.getElementById(districtId);
  const sectorSelect = document.getElementById(sectorId);
  const cellSelect = document.getElementById(cellId);
  const villageSelect = document.getElementById(villageId);

  function clear(select) { if (select) select.innerHTML = '<option value="">-- Select --</option>'; }
  function fill(select, options) { if (!select) return; clear(select); options.forEach(opt => { const el = document.createElement('option'); el.value = el.textContent = opt; select.appendChild(el); }); }

  const provinces = await getProvinces();
  fill(provinceSelect, provinces);

  provinceSelect?.addEventListener('change', async () => {
    const districts = await getDistricts(provinceSelect.value);
    fill(districtSelect, districts);
    clear(sectorSelect); clear(cellSelect); clear(villageSelect);
  });

  districtSelect?.addEventListener('change', async () => {
    const sectors = await getSectors(provinceSelect.value, districtSelect.value);
    fill(sectorSelect, sectors);
    clear(cellSelect); clear(villageSelect);
  });

  sectorSelect?.addEventListener('change', async () => {
    const cells = await getCells(provinceSelect.value, districtSelect.value, sectorSelect.value);
    fill(cellSelect, cells);
    clear(villageSelect);
  });

  cellSelect?.addEventListener('change', async () => {
    const villages = await getVillages(provinceSelect.value, districtSelect.value, sectorSelect.value, cellSelect.value);
    fill(villageSelect, villages);
  });
}

// ------------------------
// Export global for browser
// ------------------------
if (typeof window !== "undefined") {
  window.geoInfo = { version: GEO_VERSION };
  window.getProvinces = getProvinces;
  window.getDistricts = getDistricts;
  window.getSectors = getSectors;
  window.getCells = getCells;
  window.getVillages = getVillages;
  window.bindChainDropdowns = bindChainDropdowns;
}