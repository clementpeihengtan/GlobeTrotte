import City from "../wings/City";

export class CityObj {
  public key: City = City.UNKNOWN;
  public label: string = CityUtil.toString(this.key);

  public constructor(key: City) {
    this.key = key;
    this.label = CityUtil.toString(this.key);
  }
}

export class CityUtil {
  public static sortedCityList(): CityObj[] {
    return [
      new CityObj(City.AnchorageAKUS),
      new CityObj(City.BostonMAUS),
      new CityObj(City.GeorgeTownPGMY),
      new CityObj(City.KualaLumpurMY),
      new CityObj(City.LasVegasNVUS),
      new CityObj(City.LosAngelesCAUS),
      new CityObj(City.NewYorkNYUS),
      new CityObj(City.PageAZUS),
      new CityObj(City.ParisFR),
      new CityObj(City.PhoneixAZUS),
      new CityObj(City.SanFranciscoCAUS),
      new CityObj(City.SanJoseCAUS),
      new CityObj(City.SeattleWAUS),
      new CityObj(City.WashingtonDCUS),
    ];
  }

  public static toString(city: City): string {
    const cityName = {
      [City.AnchorageAKUS]: "Anchorage, Alaska, US",
      [City.BostonMAUS]: "Boston, Massachusetts, US",
      [City.GeorgeTownPGMY]: "George Town, Penang, MY",
      [City.KualaLumpurMY]: "Kuala Lumpur, MY",
      [City.LasVegasNVUS]: "Las Vegas, Nevada, US",
      [City.LosAngelesCAUS]: "Los Angeles, California, US",
      [City.NewYorkNYUS]: "New York, New York, US",
      [City.PageAZUS]: "Page, Arizona, US",
      [City.ParisFR]: "Paris, FR",
      [City.PhoneixAZUS]: "Phoenix, Arizona, US",
      [City.SanFranciscoCAUS]:
        "San Francisco, California, US",
      [City.SanJoseCAUS]: "San Jose, California, US",
      [City.SeattleWAUS]: "Seattle, Washington, US",
      [City.WashingtonDCUS]: "Washington, D.C., US",
    };
    return cityName[city] ?? "unrecognized city";
  }
}
