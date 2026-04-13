(function () {
    "use strict";

    const VERSION = "4.4";

    const TRAFFIC_SIGN_BESCHREIBUNGEN = {
        "DE:101": "🚫 **Verbot für Fahrzeuge aller Art** – Hier darf kein Auto, Motorrad oder Fahrrad fahren!",
        "DE:102": "🚫❄️ **Verbot für Schneefahrzeuge**",
        "DE:105": "🚫🚗 **Verbot für Autos**",
        "DE:106": "🚫🚛 **Verbot für LKW**",
        "DE:110": "🚫🚲 **Verbot für Fahrräder**",
        "DE:112": "🚫🚜 **Verbot für Traktoren**",
        "DE:120": "🚫🐴 **Verbot für Reiter**",
        "DE:125": "🚫🚶 **Verbot für Fußgänger**",
        "DE:136": "🚫➡️ **Verbot für Rechtsabbieger**",
        "DE:138": "🚫↪️ **Verbot für Wendende**",
        "DE:140": "🚫⏩ **Verbot für Überholen**",
        "DE:142": "🚫⏩🚛 **Verbot für LKW-Überholen**",
        "DE:150": "🚫🔊 **Verbot von Hupen**",
        "DE:201": "🚫➡️ **Keine Einfahrt** – Hier darf man nicht reinfahren!",
        "DE:205": "🛑 **Stoppschild** – Hier musst du anhalten!",
        "DE:206": "➡️ **Vorfahrtstraße** – Du hast Vorfahrt!",
        "DE:208": "↪️ **Vorfahrt gewähren** – Du musst warten!",
        "DE:209": "➡️ **Vorfahrt an der nächsten Kreuzung**",
        "DE:214": "⬅️➡️ **Gegenverkehr hat Vorfahrt**",
        "DE:215": "⬅️➡️ **Vorfahrt vor Gegenverkehr**",
        "DE:220": "🚌 **Einbahnstraße**",
        "DE:222": "🔄 **Kreisverkehr**",
        "DE:224": "🚶 **Fußgängerüberweg (Zebrastreifen)**",
        "DE:240": "🚶🚲 **Gemeinsamer Geh- und Radweg**",
        "DE:241": "🚶│🚲 **Getrennter Geh- und Radweg**",
        "DE:244": "🚲🏆 **Fahrradstraße**",
        "DE:250": "🚫 **Verbot für Fahrzeuge aller Art**",
        "DE:253": "🚗💨 **Autobahn**",
        "DE:255": "🛣️ **Kraftfahrstraße** – Nur für Autos, keine Fahrräder oder Fußgänger!",
        "DE:283": "🚫🅿️ **Absolutes Halteverbot**",
        "DE:286": "🚫🅿️ **Eingeschränktes Halteverbot**",
        "DE:290": "🅿️ **Parkplatz**",
        "DE:291": "🅿️🚗 **Parkhaus / Tiefgarage**",
        "DE:292": "🅿️🚲 **Fahrradparkplatz**",
        "DE:293": "🅿️🚌 **Busparkplatz**",
        "DE:294": "🅿️🚛 **LKW-Parkplatz**",
        "DE:295": "🅿️🚐 **Wohnmobilparkplatz**",
        "DE:297": "🅿️💰 **Gebührenpflichtiger Parkplatz**",
        "DE:298": "🅿️⏱️ **Parkplatz mit Parkscheibe**",
        "DE:299": "🅿️♿ **Behindertenparkplatz**",
        "DE:301": "⬆️ **Geradeaus**",
        "DE:303": "⬅️ **Links**",
        "DE:305": "➡️ **Rechts**",
        "DE:311": "🔄 **Kreisverkehr (Richtung)**",
        "DE:314": "🚶 **Fußgängerzone**",
        "DE:315": "🚲 **Fahrradzone**",
        "DE:316": "🚶🚲 **Fuß- und Fahrradzone**",
        "DE:317": "🧒 **Spielstraße**",
        "DE:318": "🚗🐢 **Verkehrsberuhigter Bereich**",
        "DE:321": "🏞️ **Touristische Hinweistafel**",
        "DE:322": "🏛️ **Sehenswürdigkeit**",
        "DE:323": "🏰 **Burg / Schloss**",
        "DE:324": "🌲 **Naturdenkmal**",
        "DE:325": "🏊 **Freibad**",
        "DE:326": "⛪ **Kirche**",
        "DE:327": "🏥 **Krankenhaus**",
        "DE:328": "🚒 **Feuerwehr**",
        "DE:329": "🚓 **Polizei**",
        "DE:330": "🚌 **Bus**",
        "DE:331": "🚆 **Bahn**",
        "DE:332": "✈️ **Flugplatz**",
        "DE:333": "⛴️ **Fähre**",
        "DE:334": "🚲 **Radweg**",
        "DE:335": "🚶 **Fußweg**",
        "DE:336": "🐴 **Reitweg**",
        "DE:337": "🚜 **Wirtschaftsweg**"
    };

    const ERKLAERUNGEN = {
        highway: {
            motorway:        { emoji: "🚗💨", text: "Die Autobahn! Nur für schnelle Autos. Fahrräder und Fußgänger dürfen hier nicht lang." },
            motorway_link:   { emoji: "↪️🚗", text: "Eine Auffahrt oder Abfahrt von der Autobahn." },
            trunk:           { emoji: "🚗⚡", text: "Eine sehr große Schnellstraße. Fast wie eine kleine Autobahn." },
            trunk_link:      { emoji: "↪️⚡", text: "Eine Auffahrt oder Abfahrt zu einer Schnellstraße." },
            primary:         { emoji: "🔴", text: "Eine große wichtige Straße mit vielen Autos." },
            primary_link:    { emoji: "↪️🔴", text: "Eine kurze Verbindungsstraße zu einer großen Hauptstraße." },
            secondary:       { emoji: "🟠", text: "Eine mittelgroße Straße – weniger Autos als auf einer großen Hauptstraße." },
            secondary_link:  { emoji: "↪️🟠", text: "Eine kurze Verbindungsstraße zu einer mittelgroßen Straße." },
            tertiary:        { emoji: "🟡", text: "Eine kleinere Straße. Oft schon angenehmer für Fahrräder." },
            tertiary_link:   { emoji: "↪️🟡", text: "Eine kurze Verbindungsstraße zu einer kleineren Straße." },
            unclassified:    { emoji: "⬜", text: "Eine normale kleine Straße ohne besondere große Bedeutung." },
            residential:     { emoji: "🏘️", text: "Eine Wohnstraße. Hier wohnen Menschen. Autos fahren meist langsamer." },
            living_street:   { emoji: "🧒", text: "Eine Spielstraße! Autos fahren ganz langsam, Kinder dürfen auf der Straße spielen." },
            pedestrian:      { emoji: "🚶", text: "Eine Fußgängerzone. Hier gehen Menschen zu Fuß, Autos dürfen meistens nicht hinein." },
            service:         { emoji: "🔧", text: "Eine kleine Zufahrtsstraße, zum Beispiel zu Häusern, Höfen oder Parkplätzen." },
            track:           { emoji: "🚜", text: "Ein Feld- oder Waldweg. Traktoren fahren hier oft, Fahrräder manchmal auch." },
            path:            { emoji: "🌿", text: "Ein kleiner Weg in der Natur. Zum Spazierengehen und manchmal auch zum Radfahren." },
            footway:         { emoji: "👟", text: "Ein Weg vor allem für Fußgänger." },
            cycleway:        { emoji: "🚲", text: "Ein Fahrradweg! Hier können Fahrräder besonders gut fahren." },
            bridleway:       { emoji: "🐴", text: "Ein Reitweg für Pferde." },
            steps:           { emoji: "🪜", text: "Das sind Treppen. Mit dem Fahrrad muss man hier meistens schieben oder tragen." },
            corridor:        { emoji: "🏢", text: "Ein Durchgang in einem Gebäude oder einer Anlage." },
            busway:          { emoji: "🚌", text: "Eine Fahrbahn extra für Busse." },
            road:            { emoji: "🛣️", text: "Eine Straße, deren genauer Typ noch nicht genauer beschrieben wurde." },
            construction:    { emoji: "🚧", text: "Hier wird noch gebaut. Die Straße oder der Weg ist noch nicht fertig." }
        },
        lanes: {},
        railway: {
            rail:         { emoji: "🚆", text: "Eine normale Eisenbahnstrecke für große Züge." },
            abandoned:    { emoji: "🛤️", text: "Stillgelegte Bahnstrecke – hier sind mal Züge gefahren, aber jetzt nicht mehr." },
            razed:        { emoji: "🌱", text: "Bahnstrecke, bei der die Schienen weggebaut wurden. Jetzt wächst oft Gras dort." },
            disused:      { emoji: "🧱", text: "Ungenutzte Bahnstrecke – die Schienen liegen noch da, aber kein Zug fährt mehr." },
            light_rail:   { emoji: "🚋", text: "Stadtbahn – fährt oft in der Stadt oder Vorstadt, manchmal auf der Straße." },
            tram:         { emoji: "🚃", text: "Eine Straßenbahn! Die fährt auf Schienen mitten in der Stadt." },
            subway:       { emoji: "🚇", text: "Eine U-Bahn – die fährt tief unter der Erde durch die Stadt." },
            narrow_gauge: { emoji: "🚂", text: "Eine Schmalspurbahn – die Schienen sind etwas enger als bei normalen Zügen." },
            miniature:    { emoji: "🤏", text: "Eine Miniaturbahn mit ganz kleinen Zügen, oft im Park oder Zoo." },
            preserved:    { emoji: "🏛️", text: "Eine Museumsbahn – hier fahren alte Züge, damit man sie anschauen kann!" },
            funicular:    { emoji: "🚠", text: "Eine Standseilbahn – die fährt mit einem Seil an einem Berg hoch und runter." },
            monorail:     { emoji: "🚝", text: "Eine Einschienenbahn – der Zug fährt auf einer einzelnen Schiene." }
        },
        cycleway: {
            lane:          { emoji: "➖🚲", text: "Neben der Straße gibt es eine markierte Radspur." },
            track:         { emoji: "🟦🚲", text: "Neben der Straße gibt es einen baulich getrennten Radweg." },
            shared_lane:   { emoji: "🚲↔️", text: "Fahrräder teilen sich die Fahrspur mit anderen." },
            share_busway:  { emoji: "🚲🚌", text: "Fahrräder teilen sich eine Spur mit Bussen." },
            separate:      { emoji: "🛤️🚲", text: "Der Radweg ist separat eingezeichnet und verläuft getrennt." },
            sidepath:      { emoji: "➡️🚲", text: "Es gibt einen Radweg daneben. Dieser soll benutzt werden." },
            sidewalk:      { emoji: "🚲👟", text: "Fahrräder fahren auf einem Gehweg mit besonderer Erlaubnis." },
            crossing:      { emoji: "🚲🚸", text: "Hier queren Fahrräder eine Straße oder einen anderen Weg." },
            link:          { emoji: "🔗🚲", text: "Ein kurzes Verbindungsstück für den Radverkehr." },
            asl:           { emoji: "🚲🟥", text: "Vor der Kreuzung gibt es einen Bereich, in dem Fahrräder vorne warten dürfen." },
            opposite_lane: { emoji: "↩️🚲", text: "Radfahrer dürfen in Gegenrichtung auf einer markierten Spur fahren." },
            opposite_track:{ emoji: "↩️🟦🚲", text: "Radfahrer dürfen in Gegenrichtung auf einem getrennten Radweg fahren." },
            no:            { emoji: "➖🚲", text: "Keine besondere Fahrrad-Infrastruktur – Radfahrer fahren einfach mit im Straßenverkehr." }
        },
        "cycleway:both": {
            no:            { emoji: "➖🚲", text: "Diese Straße hat auf beiden Seiten keine besondere Fahrrad-Infrastruktur." },
            yes:           { emoji: "✅🚲", text: "Auf beiden Seiten ist die Straße für Radfahrer geeignet." },
            designated:    { emoji: "🛣️🚲", text: "Auf beiden Seiten ist das Radfahren hier extra vorgesehen." },
            shared_lane:   { emoji: "🟨🚲", text: "Autos und Fahrräder fahren auf beiden Seiten auf derselben Spur." },
            shared_footway:{ emoji: "🚶‍♂️➡️🚲", text: "Auf beiden Seiten teilen sich Fahrrad und Fußgänger denselben Weg." },
            lane:          { emoji: "➖🚲", text: "Auf beiden Seiten gibt es eine markierte Radspur." },
            track:         { emoji: "🟦🚲", text: "Auf beiden Seiten gibt es einen getrennten Radweg." }
        },
        sidewalk: {
            yes:      { emoji: "👟", text: "Hier gibt es einen Gehweg." },
            no:       { emoji: "🚫👟", text: "Hier gibt es keinen Gehweg direkt an der Straße." },
            both:     { emoji: "👟👟", text: "Auf beiden Seiten der Straße gibt es Gehwege." },
            left:     { emoji: "⬅️👟", text: "Links neben der Straße gibt es einen Gehweg." },
            right:    { emoji: "➡️👟", text: "Rechts neben der Straße gibt es einen Gehweg." },
            separate: { emoji: "🛤️👟", text: "Der Gehweg ist separat eingezeichnet." }
        },
        crossing: {
            yes:             { emoji: "🚸", text: "Hier kann man queren – also die Straße oder den Weg überqueren." },
            uncontrolled:    { emoji: "🚸", text: "Eine Querungsstelle ohne Ampel." },
            traffic_signals: { emoji: "🚦", text: "Hier gibt es eine Ampel zum Überqueren." },
            zebra:           { emoji: "🦓", text: "Ein Zebrastreifen." },
            marked:          { emoji: "🧾", text: "Die Querung ist sichtbar markiert." },
            unmarked:        { emoji: "👀", text: "Hier wird gequert, aber ohne Bodenmarkierungen." },
            island:          { emoji: "🏝️", text: "In der Mitte gibt es eine Schutzinsel." },
            no:              { emoji: "🚫🚸", text: "Hier ist keine richtige Querungsstelle markiert." }
        },
        surface: {
            asphalt:      { emoji: "⬛", text: "Glatter Asphalt – sehr angenehm zum Rollen." },
            concrete:     { emoji: "🔲", text: "Harter Beton." },
            paved:        { emoji: "✅", text: "Befestigt – also ein fester Belag." },
            unpaved:      { emoji: "🟫", text: "Unbefestigt – eher natürlich und oft holpriger." },
            paving_stones:{ emoji: "🧱", text: "Pflastersteine." },
            sett:         { emoji: "🪨", text: "Grobes Steinpflaster." },
            cobblestone:  { emoji: "🪨⚠️", text: "Kopfsteinpflaster – oft holprig." },
            gravel:       { emoji: "🟡", text: "Kies mit vielen kleinen Steinen." },
            fine_gravel:  { emoji: "⚪", text: "Feiner Kies – oft etwas angenehmer." },
            compacted:    { emoji: "🟤", text: "Verdichteter Belag – festgedrückt." },
            dirt:         { emoji: "💩", text: "Ein Erdweg – weich und manchmal matschig." },
            earth:        { emoji: "🌍", text: "Natürlicher Erdboden." },
            ground:       { emoji: "🟫", text: "Normaler natürlicher Boden." },
            mud:          { emoji: "🟤💦", text: "Matschig – sehr weich und rutschig." },
            grass:        { emoji: "🌿", text: "Gras." },
            wood:         { emoji: "🪵", text: "Holz, zum Beispiel Bretter oder Bohlen." },
            sand:         { emoji: "🏖️", text: "Sand – weich und anstrengend zum Fahren." },
            rock:         { emoji: "⛰️", text: "Fels oder steiniger Untergrund." },
            metal:        { emoji: "🔩", text: "Metall – zum Beispiel eine Metallbrücke." },
            ice:          { emoji: "❄️", text: "Eis – sehr glatt!" },
            snow:         { emoji: "☃️", text: "Schnee." },
            clay:         { emoji: "🧴", text: "Lehmiger Boden, oft schmierig bei Nässe." }
        },
        smoothness: {
            excellent:    { emoji: "✨", text: "Sehr glatt – wie neu." },
            good:         { emoji: "👍", text: "Gut befahrbar." },
            intermediate: { emoji: "🙂", text: "Geht noch ganz gut, aber nicht perfekt." },
            bad:          { emoji: "😬", text: "Schon ziemlich holprig." },
            very_bad:     { emoji: "😣", text: "Sehr holprig." },
            horrible:     { emoji: "😵", text: "Ganz schön schlecht – nur für robuste Räder." },
            very_horrible:{ emoji: "🤕", text: "Extrem schlecht." },
            impassable:   { emoji: "⛔", text: "Kaum oder gar nicht passierbar." }
        },
        tracktype: {
            grade1: { emoji: "1️⃣", text: "Sehr gut ausgebauter Feld- oder Waldweg, oft befestigt." },
            grade2: { emoji: "2️⃣", text: "Noch recht guter Weg, aber schon etwas natürlicher." },
            grade3: { emoji: "3️⃣", text: "Mittlerer Feld- oder Waldweg." },
            grade4: { emoji: "4️⃣", text: "Ein eher schlechter, naturnaher Weg." },
            grade5: { emoji: "5️⃣", text: "Ein sehr naturbelassener Weg, oft schwierig zu fahren." }
        },
        amenity: {
            theatre:          { emoji: "🎭", text: "Ein Theater. Hier spielen Menschen Geschichten auf einer Bühne." },
            cinema:           { emoji: "🎬", text: "Ein Kino. Hier schaut man Filme auf einer großen Leinwand." },
            library:          { emoji: "📚", text: "Eine Bücherei. Hier kann man Bücher ausleihen und lesen." },
            arts_centre:      { emoji: "🎨", text: "Ein Ort für Kunst, Musik oder andere schöne Dinge." },
            community_centre: { emoji: "🏘️", text: "Ein Treffpunkt für Menschen aus dem Ort." },
            school:           { emoji: "🏫", text: "Eine Schule. Hier lernen Kinder und Jugendliche." },
            kindergarten:     { emoji: "🧒", text: "Ein Kindergarten. Hier spielen und lernen kleinere Kinder." },
            university:       { emoji: "🎓", text: "Eine Hochschule. Hier lernen Erwachsene weiter." },
            college:          { emoji: "🎓", text: "Eine Berufsschule oder Fachschule." },
            hospital:         { emoji: "🏥", text: "Ein Krankenhaus. Hier werden kranke Menschen versorgt." },
            clinic:           { emoji: "🏥", text: "Eine Klinik. Hier helfen Ärzte und Pflegekräfte." },
            doctors:          { emoji: "🩺", text: "Eine Arztpraxis. Hier gehen Menschen hin, wenn sie Hilfe brauchen." },
            dentist:          { emoji: "🦷", text: "Ein Zahnarzt. Hier werden die Zähne untersucht und behandelt." },
            pharmacy:         { emoji: "💊", text: "Eine Apotheke. Hier bekommt man Medikamente." },
            restaurant:       { emoji: "🍽️", text: "Ein Restaurant. Hier kann man essen." },
            cafe:             { emoji: "☕", text: "Ein Café. Hier gibt es Getränke, Kuchen oder kleine Sachen zu essen." },
            fast_food:        { emoji: "🍟", text: "Ein Imbiss. Hier gibt es schnelles Essen." },
            ice_cream:        { emoji: "🍦", text: "Eine Eisdiele! Hier gibt es Eis in vielen Sorten." },
            marketplace:      { emoji: "🧺", text: "Ein Markt oder Marktplatz. Hier verkaufen Menschen ihre Waren." },
            post_office:      { emoji: "📮", text: "Eine Post. Hier kann man Briefe und Pakete verschicken." },
            bank:             { emoji: "🏦", text: "Eine Bank. Hier geht es um Geld." },
            atm:              { emoji: "💳", text: "Ein Geldautomat. Hier kann man Geld abheben." },
            parking:          { emoji: "🅿️", text: "Ein Parkplatz. Hier können Autos oder Fahrräder abgestellt werden." },
            bicycle_parking:  { emoji: "🚲🅿️", text: "Ein Fahrradstellplatz. Hier kann man das Fahrrad abstellen." },
            fuel:             { emoji: "⛽", text: "Eine Tankstelle. Hier tanken Autos." },
            charging_station: { emoji: "⚡🔌", text: "Eine Ladestation für Elektroautos oder E-Bikes." },
            toilets:          { emoji: "🚻", text: "Öffentliche Toiletten." },
            bench:            { emoji: "🪑", text: "Eine Bank zum Sitzen und Ausruhen." },
            drinking_water:   { emoji: "💧", text: "Hier gibt es frisches Trinkwasser!" },
            shelter:          { emoji: "🛖", text: "Ein Unterstand oder eine kleine Schutzhütte." },
            waste_basket:     { emoji: "🗑️", text: "Ein Mülleimer." },
            recycling:        { emoji: "♻️", text: "Ein Recyclinghof oder eine Sammelstelle. Hier bringt man alten Müll hin." },
            fire_station:     { emoji: "🚒", text: "Eine Feuerwache. Hier warten die tapferen Feuerwehrleute!" },
            police:           { emoji: "🚓", text: "Ein Polizeirevier oder eine Polizeiwache." },
            townhall:         { emoji: "🏛️", text: "Das Rathaus. Hier arbeiten Menschen, die die Stadt verwalten." },
            place_of_worship: { emoji: "🛐", text: "Eine Kirche, Moschee, Synagoge oder ein anderer Ort zum Beten." },
            social_facility:  { emoji: "🤝", text: "Eine Sozialeinrichtung. Hier wird Menschen geholfen, die Unterstützung brauchen." }
        },
        tourism: {
            museum:      { emoji: "🏛️", text: "Ein Museum. Hier kann man spannende Dinge anschauen und etwas lernen." },
            gallery:     { emoji: "🖼️", text: "Eine Galerie. Hier hängt oder steht Kunst." },
            attraction:  { emoji: "⭐", text: "Eine Sehenswürdigkeit. Das ist ein Ort, den viele interessant finden." },
            artwork:     { emoji: "🗿", text: "Ein Kunstwerk im Freien oder an einem Platz." },
            aquarium:    { emoji: "🐠", text: "Ein Aquarium. Hier gibt es Fische und andere Wassertiere zu sehen." },
            zoo:         { emoji: "🦁", text: "Ein Zoo oder Tierpark. Hier kann man Tiere anschauen." },
            viewpoint:   { emoji: "🔭", text: "Ein Aussichtspunkt. Von hier kann man weit schauen." },
            information: { emoji: "ℹ️", text: "Eine Infostelle. Hier gibt es Hilfe oder Informationen." },
            picnic_site: { emoji: "🧺", text: "Ein Platz zum Picknicken." },
            hotel:       { emoji: "🏨", text: "Ein Hotel. Hier können Menschen übernachten." },
            guest_house: { emoji: "🛏️", text: "Ein Gästehaus oder eine Pension zum Übernachten." },
            camp_site:   { emoji: "⛺", text: "Ein Campingplatz. Hier kann man zelten!" },
            theme_park:  { emoji: "🎡", text: "Ein Freizeitpark mit Fahrgeschäften und viel Spaß!" }
        },
        shop: {
            supermarket:     { emoji: "🛒", text: "Ein Supermarkt. Hier kauft man viele Dinge für zu Hause." },
            mall:            { emoji: "🏬", text: "Ein großes Einkaufszentrum mit vielen Läden." },
            department_store:{ emoji: "🏢🛍️", text: "Ein Kaufhaus. Hier gibt es viele verschiedene Sachen." },
            convenience:     { emoji: "🥤", text: "Ein kleiner Laden für Dinge, die man oft braucht." },
            bakery:          { emoji: "🥨", text: "Eine Bäckerei. Hier gibt es Brot, Brötchen und Kuchen." },
            butcher:         { emoji: "🥩", text: "Eine Fleischerei oder Metzgerei." },
            clothes:         { emoji: "👕", text: "Ein Kleidungsgeschäft. Hier kauft man Sachen zum Anziehen." },
            books:           { emoji: "📖", text: "Eine Buchhandlung. Hier gibt es Bücher." },
            kiosk:           { emoji: "🗞️", text: "Ein kleiner Kiosk. Hier gibt es oft Zeitungen, Getränke oder Süßes." },
            bicycle:         { emoji: "🚲", text: "Ein Fahrradladen. Hier gibt es Fahrräder oder Fahrradteile." },
            toys:            { emoji: "🧸", text: "Ein Spielzeugladen!" },
            electronics:     { emoji: "💻", text: "Ein Laden für Technik wie Computer, Kabel oder andere Geräte." },
            florist:         { emoji: "🌷", text: "Ein Blumengeschäft." },
            sports:          { emoji: "⚽", text: "Ein Sportgeschäft. Hier gibt es Sportkleidung und Sportgeräte." },
            hairdresser:     { emoji: "✂️", text: "Ein Friseur. Hier werden die Haare geschnitten." },
            optician:        { emoji: "👓", text: "Ein Optiker. Hier bekommt man Brillen." },
            pet:             { emoji: "🐾", text: "Ein Tierhandlung oder Zoofachhandel. Hier gibt es alles für Tiere." },
            music:           { emoji: "🎵", text: "Ein Musikladen. Hier gibt es Instrumente oder Musik-CDs." },
            photo:           { emoji: "📷", text: "Ein Fotogeschäft. Hier werden Fotos entwickelt oder gedruckt." }
        },
        leisure: {
            park:            { emoji: "🌳", text: "Ein Park. Hier kann man spazieren, spielen oder sich ausruhen." },
            playground:      { emoji: "🛝", text: "Ein Spielplatz. Hier können Kinder spielen!" },
            sports_centre:   { emoji: "🏟️", text: "Ein Sportzentrum. Hier machen Menschen Sport." },
            stadium:         { emoji: "🏟️", text: "Ein Stadion. Hier schauen oder machen viele Menschen Sport." },
            pitch:           { emoji: "⚽", text: "Ein Sportplatz, zum Beispiel für Fußball." },
            swimming_pool:   { emoji: "🏊", text: "Ein Schwimmbad oder Becken zum Schwimmen." },
            garden:          { emoji: "🌷", text: "Ein Garten mit Pflanzen und Blumen." },
            fitness_centre:  { emoji: "🏋️", text: "Ein Fitnessstudio. Hier trainieren Menschen." },
            fitness_station: { emoji: "🏋️🌳", text: "Ein kleiner Ort im Freien, an dem man Sport machen kann." },
            marina:          { emoji: "⛵", text: "Ein Hafen für Boote." },
            track:           { emoji: "🏃", text: "Eine Sport- oder Laufbahn." },
            miniature_golf:  { emoji: "⛳", text: "Ein Minigolfplatz. Hier kann man Minigolf spielen!" },
            ice_rink:        { emoji: "⛸️", text: "Eine Eisbahn. Hier kann man Schlittschuh laufen!" },
            skate_park:      { emoji: "🛹", text: "Ein Skatepark. Hier fahren Leute Skateboard, Roller oder BMX!" },
            dog_park:        { emoji: "🐕", text: "Ein Hundeauslaufgebiet. Hier dürfen Hunde frei laufen." },
            slipway:         { emoji: "🚤", text: "Eine Bootsrampe, über die man Boote ins Wasser bringen kann." }
        },
        natural: {
            tree:       { emoji: "🌳", text: "Ein einzelner Baum, der auf der Karte eingetragen ist." },
            wood:       { emoji: "🌲", text: "Ein Wald aus Bäumen." },
            water:      { emoji: "💧", text: "Wasser – ein See, ein Teich oder ein Fluss." },
            wetland:    { emoji: "🦢", text: "Ein Feuchtgebiet wie ein Moor oder eine Sumpfwiese." },
            scrub:      { emoji: "🌿", text: "Gebüsch oder Gestrüpp – dicht wachsende Sträucher." },
            heath:      { emoji: "🟣", text: "Heideland – eine offene Landschaft oft mit Heide-Pflanzen." },
            grassland:  { emoji: "🌾", text: "Eine Wiese oder Grasfläche." },
            sand:       { emoji: "🏖️", text: "Ein Sandareal, zum Beispiel am Fluss oder See." },
            mud:        { emoji: "🟤", text: "Schlammfläche, zum Beispiel am Ufer eines Gewässers." },
            cliff:      { emoji: "🪨", text: "Ein steiler Felsen oder Abhang." },
            peak:       { emoji: "⛰️", text: "Ein Berggipfel – der höchste Punkt eines Berges." },
            spring:     { emoji: "💦", text: "Eine Quelle – hier kommt Wasser aus dem Boden!" },
            cave_entrance: { emoji: "🕳️", text: "Ein Höhleneingang. Dahinter ist eine Höhle unter der Erde." },
            beach:      { emoji: "🏖️", text: "Ein Strand – oft am Meer, See oder Fluss." },
            coastline:  { emoji: "🌊", text: "Die Küstenlinie – hier treffen Land und Wasser zusammen." }
        },
        waterway: {
            river:       { emoji: "🌊", text: "Ein Fluss. Das Wasser fließt von den Bergen ins Meer." },
            stream:      { emoji: "🏞️", text: "Ein kleiner Bach. Oft plätschert er lustig vor sich hin!" },
            canal:       { emoji: "🚢", text: "Ein Kanal – ein gerader, von Menschen gebauter Wasserweg." },
            drain:       { emoji: "💧", text: "Ein Entwässerungsgraben." },
            ditch:       { emoji: "🌧️", text: "Ein Graben, der Wasser ableitet." },
            weir:        { emoji: "💦", text: "Ein Wehr – ein kleines Hindernis im Wasser, das den Wasserstand regelt." },
            waterfall:   { emoji: "🌊⬇️", text: "Ein Wasserfall! Hier stürzt Wasser die Felsen hinunter." },
            lock:        { emoji: "🚢🔒", text: "Eine Schleuse – damit können Boote von einem Wasserstand in den anderen wechseln." }
        },
        landuse: {
            residential:   { emoji: "🏘️", text: "Ein Wohngebiet. Hier wohnen Menschen." },
            commercial:    { emoji: "🏢", text: "Ein Gewerbegebiet. Hier gibt es Geschäfte und Büros." },
            industrial:    { emoji: "🏭", text: "Ein Industriegebiet. Hier stehen Fabriken." },
            retail:        { emoji: "🛍️", text: "Ein Einkaufsgebiet mit Läden." },
            farmland:      { emoji: "🌾", text: "Ackerland. Hier wächst Getreide oder anderes Gemüse." },
            farmyard:      { emoji: "🐄", text: "Ein Bauernhof. Hier leben oft Tiere." },
            forest:        { emoji: "🌲", text: "Ein Wald – meistens mit vielen Bäumen bepflanzt." },
            meadow:        { emoji: "🌿", text: "Eine Wiese – oft zum Heumachen oder für Tiere." },
            grass:         { emoji: "🌱", text: "Eine Grasfläche." },
            cemetery:      { emoji: "⛪", text: "Ein Friedhof. Hier werden verstorbene Menschen begraben." },
            allotments:    { emoji: "🥕", text: "Kleingärten. Hier haben Familien ihren eigenen kleinen Garten!" },
            construction:  { emoji: "🚧", text: "Eine Baustelle. Hier wird gerade etwas gebaut." },
            military:      { emoji: "🪖", text: "Ein Militärgelände. Hier sind Soldaten stationiert." },
            recreation_ground: { emoji: "⚽", text: "Ein Erholungsgebiet oder Sportgelände." }
        },
        building: {
            yes:           { emoji: "🏠", text: "Hier steht ein Gebäude." },
            house:         { emoji: "🏠", text: "Ein Wohnhaus für eine oder wenige Familien." },
            apartments:    { emoji: "🏢", text: "Ein Mehrfamilienhaus mit vielen Wohnungen." },
            residential:   { emoji: "🏘️", text: "Ein Gebäude, in dem Menschen wohnen." },
            detached:      { emoji: "🏡", text: "Ein freistehendes Einfamilienhaus mit Garten drum herum." },
            school:        { emoji: "🏫", text: "Ein Schulgebäude." },
            university:    { emoji: "🎓", text: "Ein Universitätsgebäude." },
            church:        { emoji: "⛪", text: "Eine Kirche." },
            retail:        { emoji: "🛍️", text: "Ein Gebäude mit Läden im Erdgeschoss." },
            commercial:    { emoji: "🏢", text: "Ein Büro- oder Geschäftsgebäude." },
            industrial:    { emoji: "🏭", text: "Ein Fabrik- oder Lagergebäude." },
            warehouse:     { emoji: "📦", text: "Ein Lagerhaus. Hier werden Waren aufbewahrt." },
            hospital:      { emoji: "🏥", text: "Ein Krankenhausgebäude." },
            hotel:         { emoji: "🏨", text: "Ein Hotelgebäude." },
            garage:        { emoji: "🚗🏠", text: "Eine Garage für Autos." },
            shed:          { emoji: "🛖", text: "Ein Schuppen. Hier lagert man Dinge." },
            greenhouse:    { emoji: "🌱🏠", text: "Ein Gewächshaus. Hier werden Pflanzen gezogen." },
            roof:          { emoji: "⛱️", text: "Ein überdachter Bereich ohne vollständige Wände." },
            hut:           { emoji: "🛖", text: "Eine kleine Hütte." },
            barn:          { emoji: "🏚️", text: "Eine Scheune auf einem Bauernhof." }
        },
        historic: {
            castle:          { emoji: "🏰", text: "Eine Burg oder ein Schloss! Früher wohnten hier Könige oder Ritter." },
            monument:        { emoji: "🗽", text: "Ein Denkmal – es erinnert an etwas Wichtiges oder jemanden Besonderen." },
            memorial:        { emoji: "🕊️", text: "Eine Gedenkstätte oder ein Mahnmal." },
            ruins:           { emoji: "🏚️", text: "Ruinen – das sind die Überreste eines alten, kaputten Gebäudes." },
            church:          { emoji: "⛪", text: "Eine historische Kirche." },
            city_gate:       { emoji: "🚪", text: "Ein altes Stadttor. Früher schützte es die Stadt." },
            wayside_cross:   { emoji: "✝️", text: "Ein Wegkreuz – oft an Straßen oder Wegen als Erinnerung aufgestellt." },
            wayside_shrine:  { emoji: "⛩️", text: "Ein kleiner Schrein oder eine Kapelle am Wegesrand." },
            archaeological_site: { emoji: "🪣", text: "Eine archäologische Fundstelle – hier haben Forscher alte Dinge ausgegraben." },
            manor:           { emoji: "🏛️", text: "Ein Herrenhaus – früher das Haus eines reichen Gutsbesitzers." },
            fort:            { emoji: "🏰", text: "Ein Fort oder eine Festung – ein altes Verteidigungsbauwerk." },
            boundary_stone:  { emoji: "🪨", text: "Ein Grenzstein – er zeigt an, wo früher eine Grenze war." }
        },
        public_transport: {
            stop_position:  { emoji: "🚏", text: "Die genaue Stelle, wo ein Bus oder eine Bahn anhält." },
            platform:       { emoji: "🚏🟦", text: "Ein Bahnsteig oder eine Bussteig – hier wartet man auf die Bahn oder den Bus." },
            station:        { emoji: "🚉", text: "Ein Bahnhof oder eine größere Haltestelle." },
            stop_area:      { emoji: "🚌🟡", text: "Das gesamte Gebiet rund um eine Haltestelle." }
        },
        barrier: {
            fence:        { emoji: "🚧", text: "Ein Zaun." },
            wall:         { emoji: "🧱", text: "Eine Mauer." },
            gate:         { emoji: "🚪", text: "Ein Tor – man kann es öffnen, um durchzugehen." },
            bollard:      { emoji: "🪣", text: "Ein Poller – ein kurzer Pfosten, der Autos aufhält, aber Fahrräder durchlässt." },
            lift_gate:    { emoji: "🚧", text: "Eine Schranke – sie geht hoch, wenn man durchfahren darf." },
            cycle_barrier:{ emoji: "🚲🚧", text: "Eine Fahrradsperre – sie hält Motorräder auf, aber Fahrräder kommen durch." },
            stile:        { emoji: "🪜", text: "Ein Überstieg, zum Beispiel eine Treppe über einen Zaun für Fußgänger." },
            kissing_gate: { emoji: "🚶🔁", text: "Ein Drehtörchen – man kann hindurch, aber Tiere bleiben draußen." },
            hedge:        { emoji: "🌿🧱", text: "Eine Hecke – ein Zaun aus Pflanzen." }
        },
        access: {
            yes:          { emoji: "✅", text: "Hier darf man entlanggehen oder entlangfahren." },
            no:           { emoji: "🚫", text: "Hier darf man nicht einfach hinein." },
            private:      { emoji: "🔒", text: "Das ist privat. Hier darf man nur mit Erlaubnis hin." },
            permissive:   { emoji: "🙂", text: "Hier darf man gerade hin, weil es erlaubt wird. Das kann sich aber ändern." },
            destination:  { emoji: "🎯", text: "Hier darf man hin, wenn man genau dort ein Ziel hat." },
            customers:    { emoji: "🛒", text: "Hier dürfen nur Kunden hin." },
            delivery:     { emoji: "📦", text: "Hier dürfen nur Fahrzeuge oder Menschen hin, die etwas liefern." },
            agricultural: { emoji: "🚜", text: "Hier ist es vor allem für die Landwirtschaft gedacht." },
            forestry:     { emoji: "🌲", text: "Hier ist es vor allem für Waldarbeit gedacht." },
            designated:   { emoji: "🎯", text: "Dieser Weg ist extra für eine bestimmte Art von Verkehr gedacht." }
        },
        bicycle: {
            designated:  { emoji: "🚲🎯", text: "Ein richtiger Fahrradweg. Hier ist Radfahren extra vorgesehen." },
            lane:        { emoji: "➖🚲", text: "Ein Radstreifen auf der Straße. Er gehört zu den Fahrrädern." },
            track:       { emoji: "🟦🚲", text: "Ein besonders geschützter Radweg. Das ist oft sicherer." },
            separate:    { emoji: "🛤️🚲", text: "Ein eigener Radweg, getrennt von der Straße." },
            shared_lane: { emoji: "🚲↔️", text: "Fahrräder teilen sich die Spur mit anderen Fahrzeugen." },
            yes:         { emoji: "✅🚲", text: "Hier darf man Fahrrad fahren." },
            no:          { emoji: "🚫🚲", text: "Hier darf man nicht Fahrrad fahren." },
            dismount:    { emoji: "🚲⬇️", text: "Hier muss man absteigen und das Fahrrad schieben." },
            permissive:  { emoji: "🙂🚲", text: "Radfahren ist hier gerade erlaubt, aber das ist nicht für immer sicher." },
            use_sidepath:{ emoji: "➡️🚲", text: "Fahrräder sollen den Radweg daneben benutzen." },
            discouraged: { emoji: "⚠️🚲", text: "Radfahren ist hier nicht verboten, aber eher keine gute Idee." }
        },
        foot: {
            yes:         { emoji: "✅👟", text: "Zu Fuß gehen ist hier erlaubt." },
            no:          { emoji: "🚫👟", text: "Zu Fuß gehen ist hier nicht erlaubt." },
            designated:  { emoji: "👟🎯", text: "Dieser Weg ist extra für Menschen zu Fuß gedacht." },
            permissive:  { emoji: "🙂👟", text: "Zu Fuß gehen ist hier gerade erlaubt, aber das kann sich ändern." },
            use_sidepath:{ emoji: "➡️👟", text: "Fußgänger sollen den Gehweg daneben benutzen." }
        },
        segregated: {
            yes: { emoji: "🚶│🚲", text: "Fußgänger und Fahrräder sind hier getrennt – jeder hat seinen eigenen Bereich." },
            no:  { emoji: "🚶🚲", text: "Fußgänger und Fahrräder teilen sich hier dieselbe Fläche." }
        },
        oneway: {
            yes:         { emoji: "➡️", text: "Eine Einbahnstraße – Fahrzeuge dürfen nur in eine Richtung fahren." },
            no:          { emoji: "↔️", text: "Man darf in beide Richtungen fahren." },
            "-1":        { emoji: "⬅️", text: "Die Einbahnstraße gilt genau andersherum als die gezeichnete Richtung." },
            alternating: { emoji: "↕️", text: "Die Fahrtrichtung wechselt manchmal." }
        },
        "oneway:bicycle": {
            no:  { emoji: "🔄🚲", text: "Gute Nachricht! Fahrräder dürfen in beide Richtungen fahren, auch wenn Autos nur eine Richtung dürfen!" },
            yes: { emoji: "➡️🚲", text: "Auch Fahrräder dürfen nur in eine Richtung fahren." }
        },
        bridge: { yes: { emoji: "🌉", text: "Das ist eine Brücke!" } },
        tunnel: { yes: { emoji: "🚇", text: "Das ist ein Tunnel – unter der Erde oder unter etwas anderem hindurch." } },
        lit: {
            yes: { emoji: "💡", text: "Hier gibt es Licht oder Straßenlaternen." },
            no:  { emoji: "🌑", text: "Hier ist es nachts eher dunkel." }
        },
        service: {
            driveway:         { emoji: "🏠🚗", text: "Eine Einfahrt zu einem Haus oder Hof." },
            parking_aisle:    { emoji: "🅿️", text: "Ein Weg zwischen Parkplätzen." },
            alley:            { emoji: "🏙️", text: "Eine enge Gasse." },
            spur:             { emoji: "🌾", text: "Ein kleiner Stichweg, oft zu einem einzelnen Ziel." },
            emergency_access: { emoji: "🚑", text: "Ein Weg, der besonders für Rettungsfahrzeuge wichtig sein kann." }
        },
        destination:           { template: (wert) => `🪧 Das Wegweiser-Schild zeigt: Hier geht es nach **${wert}**.` },
        "destination:forward": { template: (wert) => `➡️🪧 In Fahrtrichtung zeigt das Schild nach **${wert}**.` },
        "destination:backward":{ template: (wert) => `⬅️🪧 In Gegenrichtung zeigt das Schild nach **${wert}**.` },
        "destination:ref":     { template: (wert) => `🔢🪧 Das Schild zeigt die Straßennummer **${wert}**.` },
        maxspeed: {
            none: { emoji: "💨🔥", text: "Keine allgemeine Geschwindigkeitsbegrenzung." },
            walk: { emoji: "🚶", text: "Schrittgeschwindigkeit." },
            "5":  { emoji: "🐢", text: "5 km/h – ganz langsam." },
            "20": { emoji: "🐢", text: "20 km/h – langsam." },
            "30": { emoji: "🚗💨", text: "30 km/h – eine typische Tempo-30-Zone." },
            "50": { emoji: "🚗💨💨", text: "50 km/h – normale Stadtgeschwindigkeit." },
            "100":{ emoji: "🛣️", text: "100 km/h – Landstraßen-Tempo." }
        },
        source: {
            template: (wert) => {
                const quellen = {
                    survey:           "📋 **Vermessung vor Ort** – Jemand war hier und hat sich alles genau angeschaut.",
                    gps:              "📡 **GPS-Messung** – Mit einem GPS-Gerät aufgezeichnet.",
                    "aerial imagery": "🛰️ **Luftbild** – Von oben fotografiert.",
                    bing:             "🛰️ **Bing-Luftbild** – Von Microsofts Luftbildern abgezeichnet.",
                    opendata:         "📊 **Offene Daten** – Von Behörden oder anderen offenen Datenquellen.",
                    "de:alkis":       "🏢 **Amtliches Kataster** – Offizielle Vermessungsdaten aus Deutschland."
                };
                const normalisiert = wert.toLowerCase();
                for (const [key, text] of Object.entries(quellen)) {
                    if (normalisiert.includes(key)) return text;
                }
                return `📌 **Woher kommt diese Information?** "${wert}". Das ist die Quelle der Daten.`;
            }
        },
        "access:lanes":   { template: (wert) => `🛣️ **Verschiedene Fahrspuren haben verschiedene Regeln!** ${wert}.` },
        "hgv:lanes":      { template: (wert) => `🚛 **LKW-Regeln pro Fahrspur:** ${wert}.` },
        "psv:lanes":      { template: (wert) => `🚌 **Bus-Spuren!** ${wert}.` },
        "maxspeed:lanes": { template: (wert) => `🚗💨 **Verschiedene Tempolimits pro Spur:** ${wert}.` },
        "turn:lanes":     { template: (wert) => `🔄 **Abbiegespuren!** ${wert}.` },
        "hov:lanes":      { template: (wert) => `👨‍👩‍👧‍👦 **Mehr-Personen-Spur:** ${wert}.` }
    };

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function formatTextToHtml(text) {
        return escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\n/g, "<br>");
    }

    function holeGruppenErklaerung(schluessel, wert) {
        const gruppe = ERKLAERUNGEN[schluessel];
        if (!gruppe) return null;
        if (gruppe[wert]) return gruppe[wert];
        const klein = wert.toLowerCase();
        if (gruppe[klein]) return gruppe[klein];
        if (typeof gruppe.template === "function") {
            return { emoji: "📌", text: gruppe.template(wert) };
        }
        return null;
    }

    function findeBesteErklaerung(schluessel, wert, alleTags) {
        if (schluessel === "traffic_sign") {
            for (const [nummer, text] of Object.entries(TRAFFIC_SIGN_BESCHREIBUNGEN)) {
                if (wert.includes(nummer)) {
                    return { emoji: "🚦", text: `**Verkehrszeichen ${nummer}** – ${text}` };
                }
            }
            if (wert.startsWith("AT:")) return { emoji: "🚦", text: `Österreichisches Verkehrszeichen ${wert}` };
            if (wert.startsWith("CH:")) return { emoji: "🚦", text: `Schweizer Verkehrszeichen ${wert}` };
            return { emoji: "🚦", text: `Verkehrszeichen – Dieses Schild hat die Kennung "${wert}".` };
        }

        if (schluessel === "name") {
            return { emoji: "📛", text: `Der offizielle Name dieses Weges ist **„${wert}"**.` };
        }

        if (schluessel === "ref") {
            return { emoji: "🔢", text: `Das ist die Nummer dieses Weges oder dieser Straße: **„${wert}"**.` };
        }

        if (schluessel === "lanes") {
            const zahl = parseInt(wert);
            if (!isNaN(zahl)) {
                return { emoji: "🛣️", text: `Diese Straße hat zusammen **${zahl} Fahrspur${zahl === 1 ? "" : "en"}** in beide Richtungen.` };
            }
        }
        if (schluessel === "lanes:forward") {
            const zahl = parseInt(wert);
            if (!isNaN(zahl)) {
                return { emoji: "➡️🛣️", text: `In Fahrtrichtung gibt es **${zahl} Fahrspur${zahl === 1 ? "" : "en"}**.` };
            }
        }
        if (schluessel === "lanes:backward") {
            const zahl = parseInt(wert);
            if (!isNaN(zahl)) {
                return { emoji: "⬅️🛣️", text: `In der Gegenrichtung gibt es **${zahl} Fahrspur${zahl === 1 ? "" : "en"}**.` };
            }
        }

        if (schluessel === "surface") {
            const erk = holeGruppenErklaerung("surface", wert);
            if (erk) return erk;
            return { emoji: "🪨", text: `Der Boden ist "${wert}".` };
        }

        if (schluessel === "smoothness") {
            const erk = holeGruppenErklaerung("smoothness", wert);
            if (erk) return erk;
        }

        if (schluessel === "tracktype") {
            const erk = holeGruppenErklaerung("tracktype", wert);
            if (erk) return erk;
        }

        if (schluessel === "maxspeed") {
            const zahl = parseFloat(wert);
            if (!isNaN(zahl)) {
                if (zahl <= 30) return { emoji: "🐢", text: `Tempo ${zahl} km/h – ganz langsam!` };
                if (zahl <= 50) return { emoji: "🚗", text: `Tempo ${zahl} km/h – normal in der Stadt.` };
                if (zahl <= 100) return { emoji: "🛣️", text: `Tempo ${zahl} km/h – schon recht schnell.` };
                return { emoji: "💨", text: `Tempo ${zahl} km/h – sehr schnell!` };
            }
            const erk = holeGruppenErklaerung("maxspeed", wert);
            if (erk) return erk;
        }

        if (schluessel === "oneway") {
            const erk = holeGruppenErklaerung("oneway", wert);
            if (erk) return erk;
        }
        if (schluessel === "oneway:bicycle") {
            const erk = holeGruppenErklaerung("oneway:bicycle", wert);
            if (erk) return erk;
        }

        if (schluessel === "bicycle") {
            const erk = holeGruppenErklaerung("bicycle", wert);
            if (erk) return erk;
        }

        if (schluessel === "foot") {
            const erk = holeGruppenErklaerung("foot", wert);
            if (erk) return erk;
        }

        if (schluessel === "access") {
            const erk = holeGruppenErklaerung("access", wert);
            if (erk) return erk;
        }

        if (schluessel === "amenity") {
            const erk = holeGruppenErklaerung("amenity", wert);
            if (erk) return erk;
            return { emoji: "🏢", text: `Ein besonderer Ort: ${wert}.` };
        }

        if (schluessel === "tourism") {
            const erk = holeGruppenErklaerung("tourism", wert);
            if (erk) return erk;
            return { emoji: "🧭", text: `Ein Ausflugs-Ort: ${wert}.` };
        }

        if (schluessel === "shop") {
            const erk = holeGruppenErklaerung("shop", wert);
            if (erk) return erk;
            return { emoji: "🛍️", text: `Ein Laden: ${wert}. Hier kann man etwas kaufen.` };
        }

        if (schluessel === "leisure") {
            const erk = holeGruppenErklaerung("leisure", wert);
            if (erk) return erk;
            return { emoji: "🎈", text: `Ein Freizeit-Ort: ${wert}.` };
        }

        if (schluessel === "natural") {
            const erk = holeGruppenErklaerung("natural", wert);
            if (erk) return erk;
            return { emoji: "🌿", text: `Ein Naturobjekt: ${wert}.` };
        }

        if (schluessel === "waterway") {
            const erk = holeGruppenErklaerung("waterway", wert);
            if (erk) return erk;
            return { emoji: "💧", text: `Ein Gewässer: ${wert}.` };
        }

        if (schluessel === "landuse") {
            const erk = holeGruppenErklaerung("landuse", wert);
            if (erk) return erk;
            return { emoji: "🗺️", text: `Landnutzung: ${wert}.` };
        }

        if (schluessel === "building") {
            const erk = holeGruppenErklaerung("building", wert);
            if (erk) return erk;
            return { emoji: "🏠", text: `Hier steht ein Gebäude: ${wert}.` };
        }

        if (schluessel === "historic") {
            const erk = holeGruppenErklaerung("historic", wert);
            if (erk) return erk;
            return { emoji: "🏛️", text: `Ein historischer Ort: ${wert}.` };
        }

        if (schluessel === "public_transport") {
            const erk = holeGruppenErklaerung("public_transport", wert);
            if (erk) return erk;
            return { emoji: "🚌", text: `Ein Ort für öffentliche Verkehrsmittel: ${wert}.` };
        }

        if (schluessel === "barrier") {
            const erk = holeGruppenErklaerung("barrier", wert);
            if (erk) return erk;
            return { emoji: "🚧", text: `Eine Barriere oder Sperre: ${wert}.` };
        }

        if (schluessel === "railway") {
            const erk = holeGruppenErklaerung("railway", wert);
            if (erk) return erk;
            return { emoji: "🚆", text: `Eine Eisenbahn: ${wert}.` };
        }

        if (schluessel.endsWith(":lanes")) {
            const lanesTag = holeGruppenErklaerung(schluessel, wert);
            if (lanesTag) return lanesTag;
            const basisTag = schluessel.replace(":lanes", "");
            return { emoji: "🛣️", text: `**Verschiedene Fahrspuren haben verschiedene Regeln!** ${wert}. Die Regel betrifft „${basisTag}".` };
        }

        const direkteErklaerung = holeGruppenErklaerung(schluessel, wert);
        if (direkteErklaerung) return direkteErklaerung;

        return null;
    }

    const tooltip = document.createElement("div");
    tooltip.id = "osm-kinder-tooltip";
    document.body.appendChild(tooltip);

    function tooltipZeigen(x, y, schluessel, wert, alleTags) {
        const erklaerung = findeBesteErklaerung(schluessel, wert, alleTags);

        let emoji = "🔍";
        let text = "";

        if (erklaerung) {
            emoji = erklaerung.emoji || "📌";
            text = erklaerung.text || "";
        }

        if (!text) {
            text = `„${schluessel} = ${wert}" – Eine Information aus der Karte.`;
        }

        tooltip.innerHTML = `
            <span class="tt-emoji">${escapeHtml(emoji)}</span>
            <span class="tt-tag">${escapeHtml(`${schluessel} = ${wert}`)}</span>
            <span class="tt-text">${formatTextToHtml(text)}</span>
        `;

        tooltip.classList.add("sichtbar");
        const breite = tooltip.offsetWidth || 340;
        const hoehe = tooltip.offsetHeight || 160;

        let links = x + 12;
        let oben = y - hoehe - 16;

        if (links + breite > window.innerWidth - 20) links = x - breite - 12;
        if (oben < 20) oben = y + 16;
        if (links < 10) links = 10;

        tooltip.style.left = `${links}px`;
        tooltip.style.top = `${oben}px`;
    }

    function tooltipVerstecken() {
        tooltip.classList.remove("sichtbar");
    }

    function sammleAlleTags(popup) {
        const tags = {};
        const listItems = popup.querySelectorAll("li");

        listItems.forEach((li) => {
            const tagText = li.textContent.trim();
            const gleichPos = tagText.indexOf("=");
            if (gleichPos === -1) return;
            const schluessel = tagText.substring(0, gleichPos).trim().toLowerCase();
            const wert = tagText.substring(gleichPos + 1).trim();
            if (schluessel && wert) tags[schluessel] = wert;
        });

        return tags;
    }

    function tagZeilenAusruesten(popup) {
        const alleTags = sammleAlleTags(popup);
        const listItems = popup.querySelectorAll("li");

        listItems.forEach((li) => {
            if (li.dataset.kindererklarung) return;

            const tagText = li.textContent.trim();
            const gleichPos = tagText.indexOf("=");
            if (gleichPos === -1) return;

            const schluessel = tagText.substring(0, gleichPos).trim().toLowerCase();
            const wert = tagText.substring(gleichPos + 1).trim();
            if (!schluessel || !wert) return;

            li.dataset.kindererklarung = "1";
            li.classList.add("osm-tag-zeile");

            li.addEventListener("mouseenter", (e) => tooltipZeigen(e.clientX, e.clientY, schluessel, wert, alleTags));
            li.addEventListener("mousemove", (e) => tooltipZeigen(e.clientX, e.clientY, schluessel, wert, alleTags));
            li.addEventListener("mouseleave", () => tooltipVerstecken());
        });
    }

    const beobachter = new MutationObserver((mutationen) => {
        mutationen.forEach((mutation) => {
            mutation.addedNodes.forEach((knoten) => {
                if (knoten.nodeType !== Node.ELEMENT_NODE) return;
                const popup = knoten.classList?.contains("leaflet-popup-content")
                    ? knoten
                    : knoten.querySelector?.(".leaflet-popup-content");
                if (popup) {
                    setTimeout(() => tagZeilenAusruesten(popup), 100);
                }
            });
        });
    });

    beobachter.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll(".leaflet-popup-content").forEach((popup) => {
        setTimeout(() => tagZeilenAusruesten(popup), 100);
    });

    document.addEventListener("click", () => tooltipVerstecken());

    console.log(`🧒 OSM Kinder-Erklärer ${VERSION} aktiv!`);
    console.log("📌 Enthält: Verkehrszeichen, Orte, Natur, Gebäude, Gewässer, Fahrradwege, Oberflächen und vieles mehr!");
})();
