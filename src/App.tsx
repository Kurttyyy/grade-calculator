import { useState } from "react";
import {
  Form,
  InputNumber,
  Button,
  Card,
  Statistic,
  Progress,
  Result,
} from "antd";

function App() {
  const [average, setAverage] = useState(0);
  const [show, setShow] = useState(false);

  const onFinish = (values: any) => {
    const avg = (values.Quiz + values.Activity + values.Exam) / 3;
    setAverage(avg);
    setShow(true);
  };

  return (
    <div style={{ width: 500, margin: "40px auto" }}>
      <Card title="Grade Calculator">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Quiz Score"
            name="Quiz"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Activity Score"
            name="Activity"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Exam Score"
            name="Exam"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Calculate
          </Button>
        </Form>

        {show && (
          <>
            <Statistic
              title="Final Average"
              value={average}
              precision={2}
              style={{ marginTop: 20 }}
            />

            <Progress
              percent={average}
              status={average >= 75 ? "success" : "exception"}
            />

            <Result
              status={average >= 75 ? "success" : "error"}
              title={average >= 75 ? "PASSED" : "FAILED"}
              subTitle={`Average: ${average.toFixed(2)}`}
            />
          </>
        )}
      </Card>
    </div>
  );
}

export default App;