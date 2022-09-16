// normalde app.js içinde kullandığımız UserContext'i ayrı js dosyasında tanımlayıp, diğer js dosyalarında import edeceğiz. daha az kalabalık olacak.


import { createContext, useEffect, useState} from 'react';
//-----> ilk olarak createContext fonksiyonunu react içinden çektik




export const WeatherDataContext = createContext();
//----->  merkezi veri deposunu createContext'te atama yaparak oluşturduk. ve bu depoyu export ettik ki diğer js dosyalarından import edebilelim.









export const WeatherAppDataProvider = ({children}) =>{
//-----> Şimdi de providerın kendisini export edeceğiz. Bunun için provider'ı aynen bir component gibi fonksiyon içine gömüyoruz. provider bizim component return'ni içine koyduğumuz kapsayıcı etiket olarak ekleniyor. bu şekilde transfer ediliyor.

// -----> fonksiyon parametresi olarak mutlaka  süslü parantez içinde {children}  verilmesi gerekiyor. Neden ? çünkü provider içine yerleştirilecek alt componentler olduğunu sisteme vermemiz lazım.



    const [wdata, setwdata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState("");
    const [gpserror, setGpserror] = useState(false);
    const [season, setSeason] = useState("");


    
async function getLocation(lat=null, lon = null) {

    console.log("getLocation giriş : ", lat, lon);


    if(lat !== null && lon !== null){
        console.log("getLocation parametreli çağrıldı ");
        getCoordsData( lat, lon );
        return;
    }

    function success(pos) {
        // bu fonksiyon aşağıdaki getCurrentPosition fonksiyonuna, parametre olarak callback fonksiyonu şeklinde yollanmak zorunda. oradan parametre olan pos verisini alacak. bu nedenle pos.coords verisini return yapamazsın.
      const crd = pos.coords;

      // async fonksiyon olduğu için en sondaki console.log(enlem) console.log(boylam) komutlarını önce uygulayacak ve ekrana 0 0 basacak, daha sonra aşağıdaki console.log komutlarını uygulayacak.
      // bu nedenle gelen enlem boylam bilgisini yakalayabilmek için (getData fonk. olduğu gibi) burada aktarma işlemlerini yapman lazım.
      setGpserror(false);
        getCoordsData( crd.latitude, crd.longitude);
    // getCoordsData( crd.latitude.toFixed(2), crd.longitude.toFixed(2));
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setGpserror(true);
      setTimeout(()=>{
        setGpserror(false);
      }, 2000);
      if(selectedCity.length < 1) getCoordsData(39.93, 32.85);
      
    //   setSelectedCity("Ankara");

    }
 
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(success, error);
    }else{
      console.log("Lütfen konum erişimine izin verin.");
    }

    
}



// async function getCurrent(city, lat = null, lon=null){
//     // &lat=38.123&lon=-78.543

//     const APIkey = "402079cfde584b7096d61742ecbac812";
//     let rawdata = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&lang=tr&key=${APIkey}&include=minutely`);
//     let jsondata = await rawdata.json();
//     setwdata(jsondata);

// }



async function getCoordsData(lat = null, lon=null){
    // &lat=38.123&lon=-78.543
    const APIkey = "402079cfde584b7096d61742ecbac812";
    let rawdata = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${APIkey}`);
    // let rawdata = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&lang=tr&key=${APIkey}`);
    let jsondata = await rawdata.json();
    console.log("fetch fonk. gelen lat: ", lat, " long : ", lon);
    console.log("fetch fonksiyonu içinde ilk gelen jsondata : ", jsondata);

    let monthNumber = new Date(jsondata.data[0].datetime).getMonth() + 1;
    if(monthNumber === 12 || monthNumber === 1 || monthNumber === 2 ) setSeason("winter");
    if(monthNumber === 3 || monthNumber === 4 || monthNumber === 5 ) setSeason("spring");
    if(monthNumber === 6 || monthNumber === 7 || monthNumber === 8 ) setSeason("summer");
    if(monthNumber === 9 || monthNumber === 10 || monthNumber === 11 ) setSeason("fall");
    setwdata(jsondata);
    setLoading(false);
    
}



    useEffect(()=>{
        getLocation();
        // setSelectedCity(wdata.data.city_name);
    }, []);
    

    //----->  taşıyıcı componentin return ifadesine, provider bildirimi normal yapıldığı haliyle yapılır. yani daha önce app.js içinde nasıl provider verdiysen aynısınıda buraya verirsin. depo içinde taşınacak veriyi yine  value= parametresi ilçine atarsın.
    //----->  provider etiketinin içine mutlaka {children} ifadesini koyarsın ki yukarıda parametre ile aldığın childrenları provider içine koyabilesin.
    return (
        <WeatherDataContext.Provider value={{wdata, loading, setLoading, getLocation, selectedCity, setSelectedCity, gpserror,season }}>
            {children}
        </WeatherDataContext.Provider>
    )

}
    


