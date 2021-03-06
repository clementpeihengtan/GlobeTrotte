import Axios, { AxiosRequestConfig, Method } from "axios";

enum AxMethod {
  POST = "POST",
  GET = "GET",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
}

export default class HTTPReq {
  private static host = "localhost";
  private static port = 4000;
  private static pathPrefix = "/api/";
  private static delPrefix = "del/";

  public static async genGET(uri: string): Promise<string> {
    return await this.genSendRequest(uri, AxMethod.GET);
  }

  public static async genDELETE(
    uri: string,
  ): Promise<string> {
    return await this.genSendRequest(
      HTTPReq.delPrefix + uri,
      AxMethod.POST,
    );
  }

  public static async genPOST(
    uri: string,
    data: string,
  ): Promise<string> {
    return await this.genSendRequest(
      uri,
      AxMethod.POST,
      data,
    );
  }

  public static getURI(path: string): string {
    return (
      "http://" +
      HTTPReq.host +
      ":" +
      HTTPReq.port +
      HTTPReq.pathPrefix +
      path
    );
  }

  private static async genSendRequest(
    uri: string,
    type: Method,
    data = "",
  ): Promise<string> {
    const fullURI: AxiosRequestConfig = {
      method: type,
      url: this.getURI(uri),
    };

    if (data.length > 0) {
      fullURI["data"] = data.split("\n").join("\\n");
    }
    try {
      return (await Axios.request(fullURI))["data"];
    } catch (e) {
      return "";
    }
  }
}
