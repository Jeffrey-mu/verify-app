import Success from "@/components/svg/Success";
import Error from "@/components/svg/Error";
import {
  Button,
  Input,
  Spinner,
  Card,
  CardBody,
  Divider,
} from "@nextui-org/react";
import { useState } from "react";
export default function App() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<string[] | []>([]);
  function submit() {
    setList([]);
    setIsLoading(true);
    fetch("http://localhost:3131/verify?name=" + value, {
      method: "get",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.code === 200) {
          setList(res.message);
        }
        setIsLoading(false);
      });
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === "Enter") {
      submit();
    }
  };
  return (
    <>
      <div className="flex gap-1 w-full items-center mb-2 ">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入文件地址"
        />
        <Button color="secondary" isLoading={isLoading} onClick={submit}>
          提交
        </Button>
      </div>
      {list.length == 0 && isLoading ? (
        <Spinner />
      ) : (
        <Card>
          {list.map((item, index) => {
            return (
              <>
                {index === 0 ? (
                  <CardBody>
                    {list.join(",").includes("检查全部通过，可以上传！") ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <Success />
                        验证通过
                      </div>
                    ) : (
                      <div className="flex  items-center gap-2 text-red-600">
                        验证失败
                        <Error />
                      </div>
                    )}
                  </CardBody>
                ) : (
                  <></>
                )}
                <Divider />
                <CardBody>
                  <p>{item}</p>
                </CardBody>
                <Divider />
              </>
            );
          })}
        </Card>
      )}
    </>
  );
}
