

//Constants.manifest.version
// get version from expo instead
export class AppSettings {
    public static baseUrl = 'https://www.cross-demo.zechinc.com';
    public static apiEndpoint = 'https://api.dev.themeteor.io/';
    public static socketEndpoint = 'https://cross-socket.zechinc.com';



    public static hubs = {
        marketHub: '/market-data'
    };
    public static chart = {
        defaultCandle: 30 // 30mins
    }

}