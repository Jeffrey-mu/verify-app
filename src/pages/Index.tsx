import {
  Button,
  Input, Spinner, Card, CardBody, Divider
} from "@nextui-org/react";
import { useState } from "react";
export default function App() {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState<string[] | []>([])
  function submit() {
    setList([])
    setIsLoading(true)
    fetch('http://localhost:3131/verify?name=' + value, {
      method: 'get'
    }).then(res => {
      return res.json()
    }).then(res => {
      if (res.code === 200) {
        setList(res.message)
      }
      setIsLoading(false)
    })
  }
  return <>
    <div className="flex gap-1 w-full items-center mb-2">
      <Input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder="请输入文件地址" />
      <Button color="secondary" isLoading={isLoading} onClick={submit}>提交</Button>
    </div>
    {
      list.length == 0 && isLoading ? <Spinner /> :
        <Card className="w-full">
          {
            list.map(item => {
              return <>
                <CardBody>
                  <p>{item}</p>
                </CardBody>
                <Divider /></>
            })
          }
        </Card>
    }

  </>
}
