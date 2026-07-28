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
  const [average, setAverage] =useState(0);
  const [passed, setPassed] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const getLetterGrade = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 85) return "B";
    if (grade >= 80) return "C";
    if (grade >= 75) return "D";
    return "F";
  };

  const onFinish = (values: any) => {
    const grade =
      values.quiz * 0.20 +
      values.activity * 0.30 +
      values.midterm * 0.20 +
      values.finalExam * 0.30;

    setAverage(grade);
    setPassed(grade >= 75);
    setShowResult(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        padding: "20px",
      }}
    >
      <Card
        title={
          <h2
            style={{
              textAlign: "center",
              color: "#1677ff",
              margin: 0,
            }}
          >
            📚 Student Grade Calculator
          </h2>
        }
        style={{
          width: 500,
          borderRadius: 15,
          border: "1px solid #d9d9d9",
          boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Quiz Score"
            name="quiz"
            rules={[
              { required: true, message: "Please enter the quiz score." },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Activity Score"
            name="activity"
            rules={[
              { required: true, message: "Please enter the activity score." },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Midterm Score"
            name="midterm"
            rules={[
              { required: true, message: "Please enter the midterm score." },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Final Exam Score"
            name="finalExam"
            rules={[
              {
                required: true,
                message: "Please enter the final exam score.",
              },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block size="large">
            Calculate Grade
          </Button>
        </Form>

        {showResult && (
          <div style={{ marginTop: 30 }}>
            <Statistic
              title="Final Grade"
              value={average}
              precision={2}
              valueStyle={{
                color: passed ? "#3f8600" : "#cf1322",
                fontSize: 32,
              }}
            />

            <div style={{ marginTop: 20 }}>
              <Progress
                percent={Math.round(average)}
                strokeColor={passed ? "#52c41a" : "#ff4d4f"}
              />
            </div>

            <Statistic
              title="Suggested Letter Grade"
              value={getLetterGrade(average)}
              style={{ marginTop: 20 }}
            />

            <Result
              status={passed ? "success" : "error"}
              title={passed ? "🎉 PASSED" : "❌ FAILED"}
              subTitle={`Final Grade: ${average.toFixed(
                2
              )} | Letter Grade: ${getLetterGrade(average)}`}
            />
          </div>
        )}
      </Card>
    </div>
  );
}

export default App;