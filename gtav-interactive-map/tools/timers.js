async function toolsTimers(e) {
    resetContentPart2();
    let optionDiv = document.createElement("div");
    optionDiv.innerHTML = "In Game Time";
    optionDiv.style = "cursor: unset;";

    contentPart2.append(optionDiv);

    function createOptionDivTimer(name, heistData) {
        let optionDiv = document.createElement("div");
        optionDiv.innerHTML = `${name}<p>00hrs 00min 00sec left</p>Click Here to Start`;
        contentPart2.appendChild(optionDiv);

        optionDiv.addEventListener("click", function () {
            heistData.startDate = +new Date();
            saveDataSave();
            Notification.requestPermission();
        });
        return optionDiv;
    }

    function genericTimer(
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
                (heistData.startDate + cooldown - currentTime) /
                    1000
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

    let casinoHeistTime = createOptionDivTimer(
        "Casino Heist Cooldown",
        saveData.casinoHeist
    );
    let casinoChipsTime = createOptionDivTimer(
        "Casino Chips Buy Cooldown",
        saveData.chipsBuyCooldown
    );
    let cayoPericoHeistTime = createOptionDivTimer(
        "Cayo Perico Heist Cooldown",
        saveData.cayoPericoHeist
    );
    let luckyWheelTime = createOptionDivTimer(
        "Lucky Wheel Spin Cooldown",
        saveData.luckyWheelSpin
    );
    let vipRegisterTime = createOptionDivTimer(
        "VIP Registration Duration",
        saveData.vipRegistrationDuration
    );

    let timerInterval = setInterval(async function () {
        if (!e.target.classList.contains("sel")) {
            clearInterval(timerInterval);
            return;
        }

        let gtaOnlineTime = ~~(Date.now() / 2000);
        optionDiv.innerHTML = `In Game Time<p>${
            weekday[~~(gtaOnlineTime / 1440) % 7]
        }, ${`${~~((gtaOnlineTime / 60) % 24)}`.padStart(
            2,
            "0"
        )}:${`${~~(gtaOnlineTime % 60)}`.padStart(2, "0")}</p>`;

        genericTimer(
            saveData.casinoHeist,
            +new Date(),
            casinoHeistTime,
            "Time's up!",
            "Your Casino Heist is ready.",
            2880000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/casino.svg"
        );

        genericTimer(
            saveData.chipsBuyCooldown,
            +new Date(),
            casinoChipsTime,
            "Time's up!",
            "You can now buy chips at the Casino again.",
            2880000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/casino.svg"
        );

        genericTimer(
            saveData.cayoPericoHeist,
            +new Date(),
            cayoPericoHeistTime,
            "Time's up!",
            "Your Cayo Perico Heist is ready.",
            9000000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/cayoPerico.svg"
        );

        genericTimer(
            saveData.luckyWheelSpin,
            +new Date(),
            luckyWheelTime,
            "Time's up!",
            "You can now spin the Casino's wheel again.",
            86400000,
            "https://fallbackita27.github.io/online-tooling/gtav-interactive-map/gtavIcons/casino.svg"
        );

        genericTimer(
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