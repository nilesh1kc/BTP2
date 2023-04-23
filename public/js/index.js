import { callLogin } from './login';
import { getLocation } from './map';
import { updateForm } from './updateform';
import { redirectToMaps, redirectToUpdate,redirectToHome } from './navigator';
import { performLogout } from './logout';
const pgtitle = document.getElementsByTagName('title')[0].id
if (pgtitle == 'login') {
    document.onreadystatechange = function () {
        if (document.readyState !== "complete") {
            document.querySelector(
                ".container").style.visibility = "hidden";
            document.querySelector(
                "#loader").style.visibility = "visible";
        } else {
            setTimeout(function () {
                document.querySelector("#loader").style.display = "none";
            }, 500);
            setTimeout(function () {
                document.querySelector(".container").style.visibility = "visible";
            }, 500);
        }
    };

    var foo = $('ul.load_details'); // or whatever
    var duration = "slow";  // or whatever

    if (foo.css('visibility') == 'visible') {
        foo.css({ opacity: 1 }).animate({ opacity: 0 }, duration, function () {
            foo.css({ visibility: "hidden" });
        });
    }
    document.getElementById('loginbutton').addEventListener("click", callLogin);
}

if (pgtitle == 'navigator') {
    document.onreadystatechange = function () {
        if (document.readyState !== "complete") {
            $(".buttons").hide();
            document.querySelector(
                "#loader").style.visibility = "visible";
        } else {
            setTimeout(function () {
                document.querySelector("#loader").style.display = "none";
                setTimeout(function () {
                    $(".buttons").fadeIn(1000);
                }, 1000);
            }, 1000);
        }
    };
    const buttons = document.getElementsByTagName('button')
    buttons[0].addEventListener("click", redirectToUpdate)
    buttons[1].addEventListener("click", redirectToMaps)
    buttons[2].addEventListener("click", redirectToHome)
}

if (pgtitle == 'mapview') {
    const fn = async () => {
        const loginbtn = document.getElementById('login-button');
        if (loginbtn) {
            console.log("OK from login")
            loginbtn.addEventListener("click", () => {
                location.href = '/login'
            });
        }
        const logoutbtn = document.getElementById('logout-button');
        if (logoutbtn) {
            console.log("OK from logout")
            logoutbtn.addEventListener("click", performLogout);
        }
        const homebtn = document.getElementById('home-button');
        if (homebtn) {
            console.log("OK from home")
            homebtn.addEventListener("click", () => {
                location.href = '/'
            });
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoibmlsZXNobmtjIiwiYSI6ImNsZzlkc25tMDBvaGIzZ3Qzbmo0aXA1OWcifQ.pGCfpsT-o2xCcAjFwhT6Ew';
        // const geojson = {
        //     type: 'FeatureCollection',
        //     features: [
        //         {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-77.032, 38.913]
        //             },
        //             properties: {
        //                 title: 'Mapbox',
        //                 description: 'Washington, D.C.'
        //             }
        //         },
        //         {
        //             type: 'Feature',
        //             geometry: {
        //                 type: 'Point',
        //                 coordinates: [-122.414, 37.776]
        //             },
        //             properties: {
        //                 title: 'Mapbox',
        //                 description: 'San Francisco, California'
        //             }
        //         }
        //     ]
        // };
        const centerlocation = {
            center: [87.2995948, 22.3146362],
            zoom: 14,

        };
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/nileshnkc/clg9ddpx2002y01p9ajlcjg9v',
            ...centerlocation,
            zoom: 1
        });
        map.flyTo({
            ...centerlocation, // Fly to the selected target
            duration: 12000, // Animate over 12 seconds
            essential: true // This animation is considered essential with
            //respect to prefers-reduced-motion
        });
        const colorcode = ['', '#ff0000', '#ff6600', '#ffff00', '#99ff33', '#33cc33']
        const data = await getLocation();
        if (data.status == 'success') {
            for (const feature of data.data) {
                const score = feature.score
                const coordinates = feature.location.coordinates
                // console.log(score)
                // console.log(coordinates)
                // const el = document.createElement('div');
                // el.className = `marker${score}`;
                new mapboxgl.Marker({ color: colorcode[score] }).setLngLat(coordinates).addTo(map);
                // make a marker for each feature and add to the map
                // new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);
            }
        }
    }
    fn()
}

if (pgtitle == 'updateform') {
    document.getElementById('submit').addEventListener("click", updateForm)
}

if (pgtitle == 'logout') {
    document.getElementsByTagName('button')[0].addEventListener("click", performLogout)
}

if (pgtitle == 'landingpage') {
    console.log("Entered")
    const collapseButton = document.querySelector("#collapse");

    //collapseButton.onclick = event => {

    var coll = document.getElementsByClassName("collapsible");
    var i;
    //alert('Hello'+coll.length);
    //for (i = 0; i < coll.length; i++) {
    // coll[0].addEventListener("click", function () {
    //     this.classList.toggle("active");
    //     var content = this.nextElementSibling;
    //     if (content.style.display === "block") {
    //         content.style.display = "none";
    //     } else {
    //         content.style.display = "block";
    //     }
    // });
}