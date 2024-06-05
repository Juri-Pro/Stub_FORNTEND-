import React, { useEffect, useState } from "react";
import { Checkbox, List, Input, Card, Button, notification } from "antd";
import axios from "axios";

const Process = () => {
  const [configs, setConfigs] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [header, setHeader] = useState("");
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/config");
        setConfigs(response.data);
      } catch (error) {
        console.error("Error fetching configurations:", error);
      }
    };
    fetchConfigs();
  }, []);

  const handleCheckboxChange = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/config/${id}`
      );
      setSelectedConfig(response.data);
      setInputValues({});
    } catch (error) {
      console.error("Error fetching configuration:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setInputValues({
      ...inputValues,
      [field]: value,
    });
  };

  const handleStub = async () => {
    if (!selectedConfig) return;

    const { api, methodType } = selectedConfig;

    // Dynamically build the requestData object
    const requestData = {};
    selectedConfig.fields.forEach((field) => {
      requestData[field] = inputValues[field] || "";
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${header}`, // example header
      // Add other headers as needed
    };

    try {
      const method = methodType.toLowerCase();
      // if (
      //   methodType.toLowerCase() === "post" ||
      //   methodType.toLowerCase() === "put"
      // ) {
      // const response = await axios.post(api, requestData, { headers });
      const response = await axios({
        method: method,
        url: api,
        ...(method === "post" || method === "put"
          ? { data: requestData }
          : { params: requestData }),
        headers: headers,
      });

      notification.success({
        message: "Success",
        description: "API call was successful",
      });
      console.log("API Response:", response.data);

      // else if (
      //   methodType.toLowerCase() === "delete" ||
      //   methodType.toLowerCase() === "get"
      // ) {
      //   // const response = await axios.get(api, { params: requestData, headers });
      //   response = await axios({
      //     method: method,
      //     url: api,
      //     params: requestData,
      //     headers: headers,
      //   });
      //   notification.success({
      //     message: "Success",
      //     description: "API call was successful",
      //   });
      //   console.log("API Response:", response.data);
      // }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "API call failed",
      });
      console.error("Error making API call:", error);
    }
  };

  return (
    <div>
      <h2>Process</h2>
      <List
        itemLayout="horizontal"
        dataSource={configs}
        renderItem={(config) => (
          <List.Item>
            <Checkbox onChange={() => handleCheckboxChange(config._id)}>
              {config.title}
            </Checkbox>
          </List.Item>
        )}
      />
      {selectedConfig && (
        <Card title="Configuration Details" style={{ marginTop: "20px" }}>
          <p>
            <strong>Title:</strong> {selectedConfig.title}
          </p>
          <p>
            <strong>Method Type:</strong> {selectedConfig.methodType}
          </p>
          <p>
            <strong>API:</strong> {selectedConfig.api}
          </p>
          <label>
            <strong>Header:</strong>
          </label>
          {selectedConfig.isAuthorization && (
            <Input
              placeholder={`Enter Authorization`}
              style={{ marginLeft: "10px" }}
              onChange={(e) => setHeader(e.target.value)}
            />
          )}
          <div>
            {selectedConfig.fields.map((field, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <label>
                  <strong>{field}:</strong>
                </label>
                <Input
                  placeholder={`Enter ${field}`}
                  style={{ marginLeft: "10px" }}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button
            type="primary"
            onClick={handleStub}
            style={{ marginTop: "10px" }}
          >
            Stub
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Process;
