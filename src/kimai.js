export const Kimai = {
  apiKey: localStorage.getItem("apiKey"),
  jsonApi: localStorage.getItem("apiUrl"),

  /**
   * Sets the URL where the JSON API is located and stores in the browser.
   *
   * @param string url the url of the json api
   */
  setJsonApi: function (url) {
    localStorage.setItem("apiUrl", url);
    this.jsonApi = url;
  },

  /**
   * Sets the api key and store in the browser
   *
   * @param string the api key
   */
  setApiKey: function (key) {
    localStorage.setItem("apiKey", key);
    this.apiKey = key;
  },

  /**
   * Retrieve a list  project objects.
   *
   * @return array
   */
  getProjects: async function (options) {
    return await this._doApiCall(
      "GET",
      "projects" +
        (options != undefined
          ? "?" + new URLSearchParams(options).toString()
          : ""),
      null,
    );
  },

  /**
   * Returns a list of all tasks for the current user.
   *
   * @return array
   */
  getTasks: async function (options) {
    return await this._doApiCall(
      "GET",
      "activities" +
        (options != undefined
          ? "?" + new URLSearchParams(options).toString()
          : ""),
      null,
    );
  },

  /**
   * Returns a list of all tasks for the current user.
   *
   * @return array
   */
  getCustomers: async function (options) {
    return await this._doApiCall(
      "GET",
      "customers" +
        (options != undefined
          ? "?" + new URLSearchParams(options).toString()
          : ""),
      null,
    );
  },

  /**
   * Returns null if no record is processing or an array if one is running.
   *
   * @return null|array
   */
  getActiveTimesheets: async function (options) {
    return await this._doApiCall(
      "GET",
      "timesheets/active" +
        (options != undefined
          ? "?" + new URLSearchParams(options).toString()
          : ""),
      null,
    );
  },

  /**
   * Starts the given task within the project.
   *
   * @param integer prjId
   * @param integer taskId
   * @return boolean
   */
  start: async function (prjId, taskId, options) {
    return this._doApiCall("POST", "timesheets", {
      project: prjId,
      activity: taskId,
      ...options,
    });
  },

  /**
   * Stops the current running task.
   * @param integer taskOd
   *
   * @return boolean
   */
  stop: async function (taskId) {
    return this._doApiCall("GET", "timesheets/" + taskId + "/stop", null);
  },

  /**
   * Calls the JSON Api method and returns the result.
   * This method is only meant for calls with no parameters.
   *
   * @param string apimethod
   * @access private
   * @return mixed
   */
  _doApiCall: async function (method, route, body) {
    try {
      const config = {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.apiKey,
        },
      };

      if (body != null) {
        config["body"] = JSON.stringify(body);
      }

      const response = await fetch(this.jsonApi + "/" + route, config);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data) {
        return data;
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  },
};
