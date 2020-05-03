function getPrayTime(day, month, year, latitude, longitude, timeZone) {
    const prayTime = [];

    // Get julian day
    const julianDay = ((367 * year) - (Math.floor((7 / 4) * (year + Math.floor((month + 9) / 12)))) + Math.floor(275 * (month / 9)) + day - 730531.5);

    // Get length of middle sun
    const midSunLength = ((280.461 + 0.9856474 * julianDay) % 360) + ((280.461 + 0.9856474 * julianDay) - Math.floor(280.461 + 0.9856474 * julianDay));

    // Get share of middle sun
    const midSunShare = ((357.528 + 0.9856003 * julianDay) % 360) + ((357.528 + 0.9856003 * julianDay) - Math.floor(357.528 + 0.9856003 * julianDay));

    // Get zodiac length
    const zodiacLength = midSunLength + 1.915 * Math.sin(midSunShare * Math.PI / 180) + 0.02 * Math.sin(2 * midSunShare * Math.PI / 180);

    // Get zodiac inclination
    const zodiacInclination = 23.439 - 0.0000004 * julianDay;

    // Get right ascension
    let rightAscension = Math.atan(Math.cos(zodiacInclination * Math.PI / 180) * Math.tan(zodiacLength * Math.PI / 180)) * 180 / Math.PI;
    rightAscension = rightAscension - (360 * Math.floor(rightAscension / 360));
    rightAscension = rightAscension + 90 * (Math.floor(zodiacLength / 90) - Math.floor(rightAscension / 90));

    // Get sidereal time
    const siderealTime = ((100.46 + 0.985647352 * julianDay) % 360) + ((100.46 + 0.985647352 * julianDay) - Math.floor(100.46 + 0.985647352 * julianDay));

    // Get suns angle
    const sunAngle = Math.asin(Math.sin(zodiacInclination * Math.PI / 180) * Math.sin(zodiacLength * Math.PI / 180)) * 180 / Math.PI;

    // Get disappearance of middle sun
    let noon = rightAscension > siderealTime ? ((rightAscension - siderealTime) % 360) + ((rightAscension - siderealTime) - Math.floor(rightAscension - siderealTime)) : ((siderealTime - rightAscension) % 360) - ((siderealTime - rightAscension) - Math.floor(siderealTime - rightAscension))
    noon = ((noon - longitude) / 15) + timeZone;

    // Get dhuhr time
    const dhuhr = noon / 24;
    const dhuhr_h = Math.floor(dhuhr * 24 * 60 / 60);
    const dhuhr_m = Math.floor(((dhuhr * 24 * 60) % 60).toString().padStart(2, '0'));
    prayTime[2] = `${dhuhr_h}:${dhuhr_m}`;

    // Get asr arc
    const asrArc = Math.acos((Math.sin((90 - (Math.atan(1 + Math.tan((latitude - sunAngle) * Math.PI / 180)) * 180 / Math.PI)) * Math.PI / 180) - Math.sin(sunAngle * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)) / (Math.cos(sunAngle * Math.PI / 180) * Math.cos(latitude * Math.PI / 180))) * 180 / Math.PI / 15;

    // Get asr time
    const asr = dhuhr + asrArc / 24
    const asr_h = Math.floor(asr * 24 * 60 / 60);
    const asr_m = Math.floor(((asr * 24 * 60) % 60).toString().padStart(2, '0'));
    prayTime[3] = `${asr_h}:${asr_m}`;

    // Get diurnal arc
    const diurnalArc = Math.acos((Math.sin(-0.833333 * Math.PI / 180) - Math.sin(sunAngle * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)) / (Math.cos(sunAngle * Math.PI / 180) * Math.cos(latitude * Math.PI / 180))) * 180 / Math.PI;

    // Get sunrise time
    const sunrise = (noon - diurnalArc / 15) / 24;
    const sunrise_h = Math.floor(sunrise * 24 * 60 / 60);
    const sunrise_m = Math.floor(((sunrise * 24 * 60) % 60).toString().padStart(2, '0'));
    prayTime[1] = `${sunrise_h}:${sunrise_m}`;

    // Get sunset time
    const sunset = (noon + diurnalArc / 15) / 24;
    const sunset_h = Math.floor(sunset * 24 * 60 / 60);
    const sunset_m = Math.floor(((sunset * 24 * 60) % 60).toString().padStart(2, '0'));
    prayTime[4] = `${sunset_h}:${sunset_m}`;

    // Get isha arc
    const ishaArc = Math.acos((Math.sin(-17 * Math.PI / 180) - Math.sin(sunAngle * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)) / (Math.cos(sunAngle * Math.PI / 180) * Math.cos(latitude * Math.PI / 180))) * 180 / Math.PI;

    // Get isha time
    const isha = (noon + ishaArc / 15) / 24
    const isha_h = Math.floor(isha * 24 * 60 / 60);
    const isha_m = Math.floor(((isha * 24 * 60) % 60).toString().padStart(2, '0'));
    prayTime[5] = `${isha_h}:${isha_m}`;

    // Get fajr arc
    const fajrArc = Math.acos((Math.sin(-19 * Math.PI / 180) - Math.sin(sunAngle * Math.PI / 180) * Math.sin(latitude * Math.PI / 180)) / (Math.cos(sunAngle * Math.PI / 180) * Math.cos(latitude * Math.PI / 180))) * 180 / Math.PI;

    // Get fajr time
    const fajr = (noon - fajrArc / 15) / 24
    const fajr_h = Math.floor(fajr * 24 * 60 / 60);
    const fajr_m = Math.floor(((fajr * 24 * 60) % 60).toString().padStart(2, '0'));
    prayTime[0] = `${fajr_h}:${fajr_m}`;

    console.log(prayTime);
}

getPrayTime(3, 5, 2020, 33.854687, -5.580937, 0)