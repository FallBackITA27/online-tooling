async function toolsTimers(e) {
    resetContentPart2();
    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = "In Game Time";
    optionDiv.style = "cursor: unset;";

    contentPart2.append(optionDiv);

    function genericTimerLogic(
        heistData,
        currentTime,
        optionDiv,
        notifTitle,
        notifString,
        cooldown,
        iconPath
    ) {
        let paragraphElement = optionDiv.children[0];
        if (heistData.startDate !== false) {
            if (heistData.startDate + cooldown < currentTime) {
                new Notification(notifTitle, {
                    body: notifString,
                    icon: iconPath,
                });
                heistData.startDate = false;
                saveDataSave();
            }
            let sec = Math.floor(
                (heistData.startDate + cooldown - currentTime) / 1000
            );
            let hrs = Math.trunc(sec / 3600);
            sec %= 3600;
            let min = Math.trunc(sec / 60);
            sec %= 60;
            paragraphElement.innerHTML = `${hrs
                .toString()
                .padStart(2, "0")}hrs ${min
                .toString()
                .padStart(2, "0")}min ${sec
                .toString()
                .padStart(2, "0")}sec left`;
        }
    }

    let casinoHeistTime = new OptionDivFactory(
        "Casino Heist Cooldown",
        "Click Here to Start"
    ).createTimer(saveData.casinoHeist);

    let casinoChipsTime = new OptionDivFactory(
        "Casino Chips Buy Cooldown",
        "Click Here to Start"
    ).createTimer(saveData.chipsBuyCooldown);

    let cayoPericoHeistTime = new OptionDivFactory(
        "Cayo Perico Heist Cooldown",
        "Click Here to Start"
    ).createTimer(saveData.cayoPericoHeist);

    let luckyWheelTime = new OptionDivFactory(
        "Lucky Wheel Spin Cooldown",
        "Click Here to Start"
    ).createTimer(saveData.luckyWheelSpin);

    let vipRegisterTime = new OptionDivFactory(
        "VIP Registration Duration",
        "Click Here to Start"
    ).createTimer(saveData.vipRegistrationDuration);

    let timerInterval = setInterval(async function () {
        if (!e.target.classList.contains("sel")) {
            clearInterval(timerInterval);
            return;
        }

        let gtaOnlineTime = ~~(Date.now() / 2000);
        optionDiv.innerHTML = `In Game Time<p>${
            weekday[~~(gtaOnlineTime / 1440) % 7]
        }, ${`${~~((gtaOnlineTime / 60) % 24)}`.padStart(2, "0")}:${`${~~(
            gtaOnlineTime % 60
        )}`.padStart(2, "0")}</p>`;

        genericTimerLogic(
            saveData.casinoHeist,
            +new Date(),
            casinoHeistTime,
            "Time's up!",
            "Your Casino Heist is ready.",
            2880000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/casino.svg"
        );

        genericTimerLogic(
            saveData.chipsBuyCooldown,
            +new Date(),
            casinoChipsTime,
            "Time's up!",
            "You can now buy chips at the Casino again.",
            2880000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/casino.svg"
        );

        genericTimerLogic(
            saveData.cayoPericoHeist,
            +new Date(),
            cayoPericoHeistTime,
            "Time's up!",
            "Your Cayo Perico Heist is ready.",
            9000000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/cayoPerico.svg"
        );

        genericTimerLogic(
            saveData.luckyWheelSpin,
            +new Date(),
            luckyWheelTime,
            "Time's up!",
            "You can now spin the Casino's wheel again.",
            86400000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/casino.svg"
        );

        genericTimerLogic(
            saveData.vipRegistrationDuration,
            +new Date(),
            vipRegisterTime,
            "Time's up!",
            "You can now register as a VIP again.",
            14400000,
            ""
        );
    }, 500);
}
