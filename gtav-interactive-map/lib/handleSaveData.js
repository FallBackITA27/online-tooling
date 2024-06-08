function saveDataSave() {
    console.log(saveData);
    localStorage.setItem(
        "saveData",
        JSON.stringify(saveData, (_key, value) =>
            value instanceof Set ? [...value] : value
        )
    );
}

let saveData = {
    version: "1.0.0",
    pointerMode: false,
    selectedTileLayer: "game",
    lastZoom: 2,
    lastCoords: [38.959409, -75.410156],
    casinoHeist: {
        startDate: false,
    },
    cayoPericoHeist: {
        startDate: false,
    },
    luckyWheelSpin: {
        startDate: false,
    },
    chipsBuyCooldown: {
        startDate: false,
    },
    vipRegistrationDuration: {
        startDate: false,
    },
    markerData: {
        counties: {pick: "hideAll"},
        figurines: { pick: "hideAll", set: new Set() },
        playingCards: { pick: "hideAll", set: new Set() },
        movieProps: { pick: "hideAll", set: new Set() },
        signalJammers: { pick: "hideAll", set: new Set() },
        ldOrganics: { pick: "hideAll", set: new Set() },
        kosatkaFastTravels: { pick: "hideAll" },
        cayoPericoScopeOutPlane: { pick: "hideAll" },
        cayoPericoPlasmaCutter: { pick: "hideAll" },
        cayoPericoFingerprintCloner: { pick: "hideAll" },
        cayoPericoCuttingTorch: { pick: "hideAll" },
        cayoPericoWeaponLoadout: { pick: "hideAll" },
        cayoPericoKosatkaApproachVehicle: { pick: "hideAll" },
        cayoPericoLongfinApproachVehicle: { pick: "hideAll" },
        vincentHeistSlushFund: { pick: "hideAll" },
        vincentHeistBreakingAndEntering: { pick: "hideAll" },
        vincentHeistConcealedWeapons: { pick: "hideAll" },
        vincentHeistHitAndRun: { pick: "hideAll" },
        vincentHeistDisorganizedCrime: { pick: "hideAll" },
        vincentHeistSceneOfTheCrime: { pick: "hideAll" },
    },
};

function loadInSaveData(dataStr) {
    if (dataStr != null) {
        let temporarySaveData = JSON.parse(dataStr, (key, value) =>
            [
                "completionDataFigurines",
                "completionDataMovieProps",
                "completionDataPlayingCards",
                "completionDataSignalJammers",
                "completionDataLDOrganics",
                "set",
            ].includes(key)
                ? new Set(value)
                : value
        );
        if (temporarySaveData.version !== saveData.version) {
            if (temporarySaveData.version == undefined) {
                // Save data pre-0.1.0 had no tag, there is no way to save it at this point.
                return;
            }
            if (temporarySaveData.version === "0.1.0") {
                temporarySaveData.version = "0.1.1";
                temporarySaveData.blCountyShow = false;
                temporarySaveData.lsCountyShow = false;
            }
            if (temporarySaveData.version === "0.1.1") {
                temporarySaveData.version = "0.1.2";
                temporarySaveData.completionDataMovieProps = new Set();
                temporarySaveData.lastPickMovieProps = "hideAll";
                temporarySaveData.lastPickFigurines =
                    temporarySaveData.completionDataLastPickFigurines;
                delete temporarySaveData.completionDataLastPickFigurines;
            }
            if (temporarySaveData.version === "0.1.2") {
                temporarySaveData.version = "0.2.0";
            }
            if (temporarySaveData.version === "0.2.0") {
                temporarySaveData.version = "0.3.0";
                temporarySaveData.completionDataPlayingCards = new Set();
                temporarySaveData.lastPickPlayingCards = "hideAll";
            }
            if (temporarySaveData.version === "0.3.0") {
                temporarySaveData.version = "0.3.1";
            }
            if (temporarySaveData.version === "0.3.1") {
                temporarySaveData.version = "0.4.0";
                temporarySaveData.luckyWheelSpin = {
                    startDate: false,
                };
                temporarySaveData.chipsBuyCooldown = {
                    startDate: false,
                };
                temporarySaveData.vipRegistrationDuration = {
                    startDate: false,
                };
            }
            if (temporarySaveData.version === "0.4.0") {
                temporarySaveData.version = "0.5.0";
                temporarySaveData.completionDataSignalJammers = new Set();
                temporarySaveData.lastPickSignalJammers = "hideAll";
            }
            if (temporarySaveData.version === "0.5.0") {
                temporarySaveData.version = "0.6.0";
                temporarySaveData.completionDataLDOrganics = new Set();
                temporarySaveData.lastPickLDOrganics = "hideAll";
            }
            if (temporarySaveData.version === "0.6.0") {
                temporarySaveData.version = "0.7.0";
            }
            if (temporarySaveData.version === "0.7.0") {
                temporarySaveData.version = "0.8.0";
                temporarySaveData.lastPickKosatkaFastTravels = "hideAll";
                temporarySaveData.lastPickCayoPericoScopeOutPlane = "hideAll";
            }
            if (temporarySaveData.version === "0.8.0") {
                temporarySaveData.version = "0.8.1";
            }
            if (temporarySaveData.version === "0.8.1") {
                temporarySaveData.version = "0.9.0";
                temporarySaveData.lastPickCayoPericoPlasmaCutter = "hideAll";
                temporarySaveData.lastPickCayoPericoCuttingTorch = "hideAll";
                temporarySaveData.lastPickCayoPericoFingerprintCloner =
                    "hideAll";
                temporarySaveData.pointerMode = false;
            }
            if (temporarySaveData.version === "0.9.0") {
                temporarySaveData.version = "0.10.0";
                temporarySaveData.lastPickCayoPericoWeaponLoadout = "hideAll";
                temporarySaveData.lastPickCayoPericoKosatkaApproachVehicle =
                    "hideAll";
            }
            if (temporarySaveData.version === "0.10.0") {
                temporarySaveData.version = "0.11.0";
                temporarySaveData.lastPickCayoPericoLongfinApproachVehicle =
                    "hideAll";
                temporarySaveData.lastPickVincentHeistSlushFund = "hideAll";
                temporarySaveData.lastPickVincentHeistBreakingAndEntering =
                    "hideAll";
                temporarySaveData.lastPickVincentHeistConcealedWeapons =
                    "hideAll";
                temporarySaveData.lastPickVincentHeistHitAndRun = "hideAll";
                temporarySaveData.lastPickVincentHeistSceneOfTheCrime =
                    "hideAll";
                temporarySaveData.lastPickVincentHeistDisorganizedCrime =
                    "hideAll";
            }
            if (temporarySaveData.version === "0.11.0") {
                temporarySaveData.version = "1.0.0";
                temporarySaveData.markerData = {
                    figurines: {
                        pick: temporarySaveData.lastPickFigurines,
                        set: temporarySaveData.completionDataFigurines,
                    },
                    playingCards: {
                        pick: temporarySaveData.lastPickPlayingCards,
                        set: temporarySaveData.completionDataPlayingCards,
                    },
                    movieProps: {
                        pick: temporarySaveData.lastPickMovieProps,
                        set: temporarySaveData.completionDataMovieProps,
                    },
                    signalJammers: {
                        pick: temporarySaveData.lastPickSignalJammers,
                        set: temporarySaveData.completionDataSignalJammers,
                    },
                    ldOrganics: {
                        pick: temporarySaveData.lastPickLDOrganics,
                        set: temporarySaveData.completionDataLDOrganics,
                    },
                    kosatkaFastTravels: {
                        pick: temporarySaveData.lastPickKosatkaFastTravels,
                    },
                    cayoPericoScopeOutPlane: {
                        pick: temporarySaveData.lastPickCayoPericoScopeOutPlane,
                    },
                    counties: {
                        pick: (temporarySaveData.blCountyShow && temporarySaveData.lsCountyShow) ? "showAll" : "hideAll",
                    },
                    cayoPericoPlasmaCutter: {
                        pick: temporarySaveData.lastPickCayoPericoPlasmaCutter,
                    },
                    cayoPericoFingerprintCloner: {
                        pick: temporarySaveData.lastPickCayoPericoFingerprintCloner,
                    },
                    cayoPericoCuttingTorch: {
                        pick: temporarySaveData.lastPickCayoPericoCuttingTorch,
                    },
                    cayoPericoWeaponLoadout: {
                        pick: temporarySaveData.lastPickCayoPericoWeaponLocker,
                    },
                    cayoPericoKosatkaApproachVehicle: {
                        pick: temporarySaveData.lastPickCayoPericoKosatkaApproachVehicle,
                    },
                    cayoPericoLongfinApproachVehicle: {
                        pick: temporarySaveData.lastPickCayoPericoLongfinApproachVehicle,
                    },
                    vincentHeistSlushFund: {
                        pick: temporarySaveData.lastPickVincentHeistSlushFund,
                    },
                    vincentHeistBreakingAndEntering: {
                        pick: temporarySaveData.lastPickVincentHeistBreakingAndEntering,
                    },
                    vincentHeistConcealedWeapons: {
                        pick: temporarySaveData.lastPickVincentHeistConcealedWeapons,
                    },
                    vincentHeistHitAndRun: {
                        pick: temporarySaveData.lastPickVincentHeistHitAndRun,
                    },
                    vincentHeistDisorganizedCrime: {
                        pick: temporarySaveData.lastPickVincentHeistDisorganizedCrime,
                    },
                    vincentHeistSceneOfTheCrime: {
                        pick: temporarySaveData.lastPickVincentHeistSceneOfTheCrime,
                    },
                };
                delete temporarySaveData.lastPickFigurines;
                delete temporarySaveData.lastPickPlayingCards;
                delete temporarySaveData.completionDataFigurines;
                delete temporarySaveData.completionDataPlayingCards;
                delete temporarySaveData.completionDataMovieProps;
                delete temporarySaveData.lastPickMovieProps;
                delete temporarySaveData.completionDataSignalJammers;
                delete temporarySaveData.lastPickSignalJammers;
                delete temporarySaveData.completionDataLDOrganics;
                delete temporarySaveData.lastPickLDOrganics;
                delete temporarySaveData.lastPickKosatkaFastTravels;
                delete temporarySaveData.lastPickCayoPericoScopeOutPlane;
                delete temporarySaveData.lastPickCayoPericoPlasmaCutter;
                delete temporarySaveData.lastPickCayoPericoFingerprintCloner;
                delete temporarySaveData.lastPickCayoPericoCuttingTorch;
                delete temporarySaveData.lastPickCayoPericoWeaponLoadout;
                delete temporarySaveData.lastPickCayoPericoKosatkaApproachVehicle;
                delete temporarySaveData.lastPickCayoPericoLongfinApproachVehicle;
                delete temporarySaveData.lastPickVincentHeistSlushFund;
                delete temporarySaveData.lastPickVincentHeistBreakingAndEntering;
                delete temporarySaveData.lastPickVincentHeistConcealedWeapons;
                delete temporarySaveData.lastPickVincentHeistHitAndRun;
                delete temporarySaveData.lastPickVincentHeistDisorganizedCrime;
                delete temporarySaveData.lastPickVincentHeistSceneOfTheCrime;
                delete temporarySaveData.blCountyShow;
                delete temporarySaveData.lsCountyShow;
            }
            if (temporarySaveData.version === "1.0.0") {
                // Current version
            }
            // Here you check the version tag in the savedata and modify it to match the data right after - this way old save data will not be lost.
        }
        saveData = temporarySaveData;
    }
}

loadInSaveData(localStorage.getItem("saveData"));
saveDataSave();