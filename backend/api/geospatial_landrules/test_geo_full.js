// test_geo_full.js
(async () => {
  try {
    const geoModule = await import('./geoTowindow.js');

    const { getProvinces, getDistricts, getSectors, getCells, getVillages } = geoModule;

    const provinces = await getProvinces();
    console.log("✅ Provinces:");
    console.log(provinces.join(", "));
    console.log("\n");

    for (const province of provinces) {
      console.log(`🌍 Province: ${province}`);
      const districts = await getDistricts(province);

      for (const district of districts) {
        console.log(`  🏘 District: ${district}`);
        const sectors = await getSectors(province, district);

        for (const sector of sectors) {
          console.log(`    🏚 Sector: ${sector}`);
          const cells = await getCells(province, district, sector);

          for (const cell of cells) {
            console.log(`      🏠 Cell: ${cell}`);
            const villages = await getVillages(province, district, sector, cell);
            console.log(`        🏡 Villages: ${villages.join(", ")}`);
          }
        }
      }
      console.log("\n");
    }

    console.log("✅ Full hierarchy loaded successfully!");
  } catch (err) {
    console.error("❌ Test failed:", err);
  }
})();
