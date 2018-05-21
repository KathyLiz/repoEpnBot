/**
 * JS File to create constants (URL Resources, URL images, URL Videos, etc)(GEA Bot)
 */
/**
 * Function to create array of constants (Resources Images) to create carrousel
 */
function createCarrouselCarrerasGrado(){
	var array = [];
	var arrayToSend = [];


	var ciencias ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/2014/10/ciencias1.jpg",
        "title":"Facultad de Ciencias",
        "carreras":"Física, Matemática, Ingeniería Matemática, Economía"
    };
    var cienciasAdmin ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/2014/09/CEC_EPN_Classroom_Building_at_Escuela_Polit%C3%A9cnica_Nacional_Quito_Ecuador._01.jpg",
        "title":"Facultad de Ciencias Administrativas",
        "carreras":"Ingeniería de la Producción"
    };
    var civilAmbiental ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/2014/10/civil.jpg",
        "title":"Facultad de Ingeniería Civil y Ambiental",
        "carreras":" Ingeniería Civil,  Ingeniería Ambiental"
    };
    var electricaElectronica ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/facultaddeingenieriaelectricaadentro.jpg",
        "title":"Facultad de Ingeniería Eléctrica y Electrónica",
        "carreras":"Electricidad, Electrónica y Automatización, Tecnologías de la Información, Telecomunicaciones"
    };

    var geoPetroleos ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/2014/10/petroleos.jpg",
        "title":" Facultad de Ingeniería en Geología y Petróleos",
        "carreras":"Ingeniería en Geología, Ingeniería en Minas y Petróleos"
    };
    var mecanica ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/2010/09/DSC00421.jpg",
        "title":"Facultad de Ingeniería Mecánica",
        "carreras":"Ingeniería Mecánica"
    };
    var quimiaAgro ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/edquimicaweb.jpg",
        "title":"Facultad de Ingeniería Química y Agroindustria",
        "carreras":"Ingeniería Química, INgeniería en Agroindustria"
    };
    var sistemas ={  
        "urlImage":"http://www.epn.edu.ec/wp-content/uploads/2014/10/sistemas1.jpg",
        "title":"Facultad de Ingeniería de Sistemas",
        "carreras":"Ingeniería de Software, Ingeniería en Ciencias de la Computación"
    };

    array.push(ciencias);
    array.push(cienciasAdmin);
    array.push(civilAmbiental);
    array.push(electricaElectronica);
    array.push(geoPetroleos);
    array.push(mecanica);
    //New images
    array.push(quimiaAgro);
    array.push(sistemas);

    return array;
}

/**
 * Function to create array of constants (Resources Images) to create carrousel
 */
function createCarrouselConstants(){
	var array = [];
	var arrayToSend = [];


	var cocaCola ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/coca_cola.png",
        "title":"Coca-Cola",
        "descripcion":"Coca-Cola"
    };

     var arcaContinental ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/arca_continental.png",
        "title":"Arca Continental",
        "descripcion":"Arca Continental"
    };

    var bancoBolivariano={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/logo_bolivariano.png",
        "title":"Banco Bolivariano",
        "descripcion":"Banco Bolivariano"
    };

    var bancoPacifico ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/logo_pacifico.png",
        "title":"Banco Pacífico",
        "descripcion":"Banco Pacífico"
    };

    var toni ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/toni.png",
        "title":"Toni S.A",
        "descripcion":"Toni S.A"
    };

    var utpl ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/utpl.png",
        "title":"UTPL",
        "descripcion":"UTPL"
    };

    //New images

    var univisa ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/univisa.jpg",
        "title":"Univisa",
        "descripcion":"Univisa"
    };

    var salud ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/salud_sa.jpg",
        "title":"Salud S.A",
        "descripcion":"Salud S.A"
    };

    var chubb ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/CHUBB.jpg",
        "title":"Chubb",
        "descripcion":"Chubb"
    };        

    var sgs ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/sgs.jpg",
        "title":"SGS",
        "descripcion":"SGS"
    };


    var movistar ={  
        "urlImage":"https://chatbot.interlancompu.com/view/images/movistar.jpg",
        "title":"Movistar",
        "descripcion":"Movistar"
    };

    array.push(cocaCola);
    array.push(arcaContinental);
    array.push(bancoBolivariano);
    array.push(bancoPacifico);
    array.push(toni);
    array.push(utpl);
    //New images
    array.push(univisa);
    array.push(salud);
    array.push(chubb);
    array.push(sgs);
    array.push(movistar);

    //Here shuffle the elements of the array
    //shuffle(array);

    //
    //return array.slice(0, 6);
    return array;
}

/**
 * Create videos resources (Youtube links)
 */
function createURLYoutubeVideos(){
	var array = [];
	var urlService1 = "https://www.youtube.com/embed/FjsrCPshXXE";
	var urlService2 = "https://www.youtube.com/embed/LFr2EIA1hnc";
	var urlService3 = "https://www.youtube.com/embed/sU3onv_VK8A";
	var urlService4 = "https://www.youtube.com/embed/AXJ7JgjLRqM";
	array.push(urlService1);
	array.push(urlService2);
	array.push(urlService3);
	array.push(urlService4);
	return array;
}


/**
 * Function to shuffle the elements inside the array.
 */
function shuffle(totalArray) {
    var j, x, i;
    for (i = totalArray.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = totalArray[i - 1];
        totalArray[i - 1] = totalArray[j];
        totalArray[j] = x;
    }
}

//Here export the variables to be accesable in pmGeaBot.js
module.exports = Object.freeze({
	CODE_INIT_SESSION: "59b1b13db2df1",
    CARROUSEL_CLIENTS_ARRAY: createCarrouselConstants(),
    CARROUSEL_CARRERAS_GRADO_ARRAY: createCarrouselCarrerasGrado(),
    VIDEOS_SERVICES_YOUTUBE_ARRAY: createURLYoutubeVideos(),
    IMAGE_UBICATION_CONTACT_CENTER_URL: "https://chatbot.interlancompu.com/view/images/ubicationContactCenter.png"
});