
if (Meteor.isServer) {
  
  Meteor.publish("maps", function () {
    return Maps.find({});
  });

  Meteor.publish("figures", function (mapName) {
    return Figures.find({map:mapName});
  });
  
  Meteor.publish("players", function (mapName) {
    return Players.find({map:mapName});
  });

  Meteor.publish("allplayers", function () {
    return Players.find();
  });

  Meteor.methods({
    readyPlayerOne: function () {
      id = Players.insert({})
      return id;
    }
  });

  Meteor.startup(function () {
    //Players.remove({})
    //Players.insert({map: "timorous", name:"jrox", x:-1390, y:3256, z:280})

    if(!Maps.findOne()){
      //clean up old records
      Maps.remove({})
      Figures.remove({})

       var mapNamesData = Assets.getText("zone_name_map.csv"),
          mapNames = {}

      _.each(mapNamesData.split("\n"), function(l){
        mapNames[l.split(",")[0]] = l.split(",")[1]
      })
      
      console.log(mapNames)
      // code to run on server at startup
      //var mapList = ["airplane_1.txt", "airplane_2.txt", "akanon_1.txt", "akanon_2.txt", "apprentice_2.txt", "arena_1.txt", "arena_2.txt", "arttest_2.txt", "aviak_2.txt", "befallen_1.txt", "befallen_2.txt", "beholder_1.txt", "beholder_2.txt", "blackburrow_1.txt", "blackburrow_2.txt", "burningwood_1.txt", "burningwood_2.txt", "butcher_1.txt", "butcher_2.txt", "cabeast_1.txt", "cabeast_2.txt", "cabwest_1.txt", "cabwest_2.txt", "cauldron_1.txt", "cauldron_2.txt", "cazicthule_1.txt", "cazicthule_2.txt", "charasis_1.txt", "charasis_2.txt", "chardok_1.txt", "chardok_2.txt", "citymist_1.txt", "citymist_2.txt", "cobaltscar_1.txt", "cobaltscar_2.txt", "crushbone_1.txt", "crushbone_2.txt", "crystal_1.txt", "crystal_2.txt", "dalnir_1.txt", "dalnir_2.txt", "dreadlands_1.txt", "dreadlands_2.txt", "droga_1.txt", "droga_2.txt", "eastkarana_1.txt", "eastkarana_2.txt", "eastwastes_1.txt", "eastwastes_2.txt", "emeraldjungle_1.txt", "emeraldjungle_2.txt", "erudnext_1.txt", "erudnext_2.txt", "erudnint_1.txt", "erudnint_2.txt", "erudsxing2_2.txt", "erudsxing_1.txt", "erudsxing_2.txt", "everfrost_1.txt", "everfrost_2.txt", "fearplane_1.txt", "fearplane_2.txt", "feerrott_1.txt", "feerrott_2.txt", "felwithea_1.txt", "felwithea_2.txt", "felwitheb_1.txt", "felwitheb_2.txt", "fieldofbone_1.txt", "fieldofbone_2.txt", "firiona_1.txt", "firiona_2.txt", "frontiermtns_1.txt", "frontiermtns_2.txt", "frozenshadow_1.txt", "frozenshadow_2.txt", "gfaydark_1.txt", "gfaydark_2.txt", "greatdivide_1.txt", "greatdivide_2.txt", "grobb_1.txt", "grobb_2.txt", "growthplane_1.txt", "growthplane_2.txt", "gukbottom_1.txt", "gukbottom_2.txt", "guktop_1.txt", "guktop_2.txt", "halas_1.txt", "halas_2.txt", "hateplane_1.txt", "hateplane_2.txt", "hateplaneb_1.txt", "hateplaneb_2.txt", "highkeep_1.txt", "highkeep_2.txt", "highpass_1.txt", "highpass_2.txt", "hole_1.txt", "hole_2.txt", "iceclad_1.txt", "iceclad_2.txt", "innothule_1.txt", "innothule_2.txt", "innothuleb_1.txt", "innothuleb_2.txt", "kael_1.txt", "kael_2.txt", "kaesora_1.txt", "kaesora_2.txt", "kaladima_1.txt", "kaladima_2.txt", "kaladimb_1.txt", "kaladimb_2.txt", "karnor_1.txt", "karnor_2.txt", "kedge_1.txt", "kedge_2.txt", "kerraridge_1.txt", "kerraridge_2.txt", "kithicor_1.txt", "kithicor_2.txt", "kurn_1.txt", "kurn_2.txt", "lakeofillomen_1.txt", "lakeofillomen_2.txt", "lakerathe_1.txt", "lakerathe_2.txt", "lavastorm_1.txt", "lavastorm_2.txt", "lfaydark_1.txt", "lfaydark_2.txt", "mischiefplane_1.txt", "mischiefplane_2.txt", "mistmoore_1.txt", "mistmoore_2.txt", "misty_1.txt", "misty_2.txt", "najena_1.txt", "najena_2.txt", "necropolis_1.txt", "necropolis_2.txt", "nedaria_1.txt", "nedaria_2.txt", "nektropos_2.txt", "nektulos_1.txt", "nektulos_2.txt", "neriaka_1.txt", "neriaka_2.txt", "neriakb_1.txt", "neriakb_2.txt", "neriakc_1.txt", "neriakc_2.txt", "neriakd_2.txt", "northkarana_1.txt", "northkarana_2.txt", "nurga_1.txt", "nurga_2.txt", "oggok_1.txt", "oggok_2.txt", "oot_1.txt", "oot_2.txt", "overthere_1.txt", "overthere_2.txt", "paineel_1.txt", "paineel_2.txt", "paw_1.txt", "paw_2.txt", "permafrost_1.txt", "permafrost_2.txt", "qcat_1.txt", "qcat_2.txt", "qey2hh1_1.txt", "qey2hh1_2.txt", "qeynos2_1.txt", "qeynos2_2.txt", "qeynos_2.txt", "qeytoqrg_1.txt", "qeytoqrg_2.txt", "qrg_1.txt", "qrg_2.txt", "rathemtn_1.txt", "rathemtn_2.txt", "rivervale_1.txt", "rivervale_2.txt", "runnyeye_1.txt", "runnyeye_2.txt", "sebilis_1.txt", "sebilis_2.txt", "shadowrest_1.txt", "shadowrest_2.txt", "sirens_1.txt", "sirens_2.txt", "skyfire_1.txt", "skyfire_2.txt", "skyshrine_1.txt", "skyshrine_2.txt", "sleeper_1.txt", "sleeper_2.txt", "soldunga_1.txt", "soldunga_2.txt", "soldungb_1.txt", "soldungb_2.txt", "soltemple_1.txt", "soltemple_2.txt", "southkarana_1.txt", "southkarana_2.txt", "steamfont_1.txt", "steamfont_2.txt", "stonebrunt_1.txt", "stonebrunt_2.txt", "swampofnohope_1.txt", "swampofnohope_2.txt", "templeveeshan_1.txt", "templeveeshan_2.txt", "thurgadina_1.txt", "thurgadina_2.txt", "thurgadinb_1.txt", "thurgadinb_2.txt", "timorous_1.txt", "timorous_2.txt", "tox_1.txt", "tox_2.txt", "trakanon_1.txt", "trakanon_2.txt", "tutoriala_1.txt", "tutoriala_2.txt", "tutorialb_1.txt", "tutorialb_2.txt", "unrest_1.txt", "unrest_2.txt", "veeshan_1.txt", "veeshan_2.txt", "veksar_1.txt", "veksar_2.txt", "velketor_1.txt", "velketor_2.txt", "wakening_1.txt", "wakening_2.txt", "warrens_1.txt", "warrens_2.txt", "warslikswood_1.txt", "warslikswood_2.txt", "westwastes_1.txt", "westwastes_2.txt"]
      var mapList = ["Acrylia_1.txt","AirPlane_1.txt","Akanon_1.txt","Akheva_1.txt","Arena_1.txt","Befallen_1.txt","Beholder_1.txt","Blackburrow_1.txt","Bothunder_1.txt","BurningWood_1.txt","Butcher_1.txt","CSHome_1.txt","Cabeast_1.txt","Cabwest_1.txt","Cauldron_1.txt","CazicThule_1.txt","Charasis_1.txt","Chardok2_1.txt","Chardok_1.txt","Charis_1.txt","CityMist_1.txt","CobaltScar_1.txt","Codecay_1.txt","Commons_1.txt","Crushbone_1.txt","Crystal_1.txt","Dalnir_1.txt","Dalnir_lvl_1_1.txt","Dalnir_lvl_2_1.txt","Dalnir_lvl_3_1.txt","Dawnshroud_1.txt","Dreadlands_1.txt","Droga_1.txt","EastKarana_1.txt","EastWastes_1.txt","Echo_1.txt","Ecommons_1.txt","EmeraldJungle_1.txt","ErudnExt_1.txt","ErudnInt_1.txt","ErudsXing_1.txt","Everfrost_1.txt","FearPlane_1.txt","Feerrott_1.txt","FelwitheA_1.txt","FelwitheB_1.txt","FieldOfBone_1.txt","Firiona_1.txt","FreportE_1.txt","FreportN_1.txt","FreportW_1.txt","FrontierMtns_1.txt","FrozenShadow_1.txt","Fungusgrove_1.txt","Gfaydark_1.txt","Greatdivide_1.txt","Griegsend_1.txt","Grimling_1.txt","Growthplane_1.txt","GukBottom_1.txt","GukTop_1.txt","Halas_1.txt","HatePlane_1.txt","Highkeep_1.txt","Highpass_1.txt","Hohonora_1.txt","Hohonorb_1.txt","Hole-tower_1.txt","Hole_1.txt","Hollowshade_1.txt","Iceclad_1.txt","Jaggedpine_1.txt","Kael_1.txt","Kaesora_1.txt","KaladimA_1.txt","KaladimB_1.txt","Karnor_1.txt","Katta_1.txt","Kedge_1.txt","KerraRidge_1.txt","Kithicor_1.txt","Kurn_1.txt","LakeRathe_1.txt","LakeofIllOmen_1.txt","Lavastorm_1.txt","Letalis_1.txt","Lfaydark_1.txt","Maiden_1.txt","MischiefMaze_1.txt","Mischiefplane_1.txt","Mistmoore_1.txt","Misty_1.txt","Mseru_1.txt","Najena_1.txt","NecropolisLower_1.txt","Necropolis_1.txt","Nektulos_1.txt","NeriakA_1.txt","NeriakB_1.txt","NeriakC_1.txt","Netherbian_1.txt","Nightmareb_1.txt","NorthKarana_1.txt","Nro_1.txt","Nurga_1.txt","OOT_1.txt","Oasis_1.txt","Oggok_1.txt","Overthere_1.txt","Paineel_1.txt","Paw_1.txt","PermafrostPits_1.txt","Permafrost_1.txt","Poair_1.txt","Podisease_1.txt","Pofire_1.txt","Poinnovation_1.txt","Pojustice_1.txt","Ponightmare_1.txt","Postorms_1.txt","Potactics_1.txt","Potorment_1.txt","Potranquility_1.txt","Povalor_1.txt","Powar_1.txt","Powater_1.txt","QRG_1.txt","Qey2HH1_1.txt","Qeytoqrg_1.txt","Rathemtn_1.txt","Rivervale_1.txt","Runnyeye_1.txt","SKarana_1.txt","Scarlet_1.txt","SebilisMain_1.txt","SebilisSewers_1.txt","Sebilis_1.txt","Shadeweaver_1.txt","SharVahl_1.txt","Sirens_1.txt","Skyfire_1.txt","Skyshrine2_1.txt","Skyshrine3_1.txt","Skyshrine_1.txt","Skyshrine_Lower_1.txt","Skyshrine_Upper_1.txt","Sleeper_1.txt","SolTemple_1.txt","SoldungA_1.txt","SoldungB_1.txt","Solrotower_1.txt","SouthKarana_1.txt","Sro_1.txt","Sseru_1.txt","Ssratemple_1.txt","Steamfont_1.txt","Stonebrunt_1.txt","Swampofnohope_1.txt","TempleRo_1.txt","Templeveeshan-detailed_1.txt","Templeveeshan_1.txt","Tenebrous_1.txt","TheDeep_1.txt","Thegrey_1.txt","Thurgadina1_1.txt","Thurgadina_1.txt","Thurgadinb_1.txt","Timorous_1.txt","Tox_1.txt","Trakanon_1.txt","Twilight_1.txt","Umbral_1.txt","Unrest_1.txt","Veeshan_1.txt","Velketor_1.txt","Vexthal_1.txt","Wakening_1.txt","Warrens_1.txt","WarsliksWood_1.txt","Westwastes_1.txt","bazaar_1.txt","bazaar_2.txt","bazaar_3.txt","butcher_2.txt","butcher_3.txt","dawnshroud_2.txt","dawnshroud_3.txt","grobb_1.txt","grobb_2.txt","grobb_3.txt","innothule_1.txt","innothule_2.txt","innothule_3.txt","kerraridge2_1.txt","mseru_2.txt","mseru_3.txt","nexus_1.txt","nexus_2.txt","nexus_3.txt","paludal_1.txt","paludal_2.txt","paludal_3.txt","poknowledge_1.txt","poknowledge_2.txt","poknowledge_3.txt","qcat_1.txt","qcat_2.txt","qcat_3.txt","qeynos2_1.txt","qeynos2_2.txt","qeynos2_3.txt","qeynos_1.txt","qeynos_2.txt","qeynos_3.txt","shadowhaven_1.txt","shadowhaven_2.txt","shadowhaven_3.txt","southkarana_2.txt","southkarana_3.txt","sseru_2.txt","sseru_3.txt"]
      _.each(mapList, function(mapName){
        var realMapName = mapName.replace(/_\d\.txt/, "")
        var mapId = Maps.findOne({name: realMapName}) ? Maps.findOne({name: realMapName})._id : Maps.insert({name: realMapName, long_name: mapNames[realMapName.toLowerCase()]})
        console.log(realMapName + ' :: ' + mapId + ' :: ' + mapName )
        var mapData = Assets.getText("maps/"+mapName)
        _.each(mapData.split("\n"), function(data){
          if(data.match(/L /)){
           // console.log("line")
            var points = data.replace("L ", "").replace(/\s/,"").split(",")
            var figure = {map: realMapName, type: "line", x1: parseInt(points[0]), y1: parseInt(points[1]), z1: parseInt(points[2]), x2: parseInt(points[3]), y2: parseInt(points[4]), z2: parseInt(points[5]), r: parseInt(points[6]), g: parseInt(points[7]), b: parseInt(points[8])}
            Figures.insert(figure, function(){})
            //console.log(figure)
          }
          else if(data.match(/P /)){
            //console.log("point")
            var points = data.replace("P ", "").replace(/\s/,"").split(",")
            var figure = {map: realMapName, type: "label", x: parseInt(points[0]), y: parseInt(points[1]), z: parseInt(points[2]), r: parseInt(points[3]), g: parseInt(points[4]), b: parseInt(points[5]), font_size: parseInt(points[6]), label: points[7] }
            Figures.insert(figure, function(){})
          }
        })
        if(!Figures.findOne({map: realMapName})){
          Maps.remove({name: realMapName})
        }
      })
    }
  });
}