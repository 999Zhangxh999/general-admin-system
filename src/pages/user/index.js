import React, { useEffect, useState } from "react"
import {
  Button,
  Form,
  Input,
  Select,
  Table,
  Popconfirm,
  Modal,
  InputNumber,
  DatePicker,
} from "antd"
import "./user.css"
import { getUser , addUser, editUser,delUser} from "../../api"
import dayjs, { Dayjs } from "dayjs"
import { render } from "@testing-library/react"

const User = () => {
  const [listData, setListData] = useState({
    name: "",
  })
  const [TableData, setTableData] = useState()
  // 0:新增 1:编辑
  const [modalType, setModalType] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 创建form实例
  const [form] = Form.useForm()
  // 新增/编辑
  const handleClick = (type, rowData) => {
    setIsModalOpen(!isModalOpen)
    if (type == "add") {
      setModalType(0)
    } else {
      setModalType(1)
      const cloneData = JSON.parse(JSON.stringify(rowData))
      cloneData.birth=dayjs(cloneData.birth)
        // 表单数据回填
        form.setFieldsValue(cloneData)
      
    }
  }
  // 提交
  const handleFinish = (e) => {
    setListData({ name: e.keyword })
  }
  useEffect(() => {
    getTableData()
  },[listData])

  // 删除
  const handleDelete = ({id}) => {
    delUser({id}).then((res) => {
      getTableData()
    })

  }
  const getTableData = () => {
    getUser(listData).then(({ data }) => {
      // console.log(res,'res')
      setTableData(data.list)
    })
  }
  // 弹窗确定
  const handleOK = () => {
    // 表单校验
    form.validateFields().then((val) => {
      // 日期
      val.birth=dayjs(val.birth).format('YYYY-MM-DD')
      console.log(val,'val')
      // 调接口
      if(modalType){  //编辑
       editUser(val).then(() => {
          handleCancel()
          getTableData()
       })
      }else{  //新增
        addUser(val).then(() => {
          handleCancel()
          getTableData()
        })
      }
    }).catch((err) => {
      console.log(err)
    })


  }
  // 弹窗取消
  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
  }
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      render: (val) => {
        return val ? "女" : "男"
      },
      key: "sex",
    },
    {
      title: "出生日期",
      dataIndex: "birth",
    },
    {
      title: "地址",
      dataIndex: "addr",
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_,rowData) => {
        return (
          <div className="flex-box">
            <Button
              style={{ marginRight: "5px" }}
              onClick={() => handleClick("edit",rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="提示"
              description="此操作将删除该用户，是否继续？"
              okText="确认"
              cancelText="取消"
              onConfirm={() => handleDelete(rowData)}
            >
              <Button type="primary" danger>
                删除{" "}
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]
  useEffect(() => {
    // 调用后端接口获取用户列表数据
    getTableData()
  }, [])
  return (
    <div className="user">
      <div className="flex-box space-between">
        <Button type="primary" onClick={() => handleClick("add")}>
          +新增
        </Button>
        <Form layout="inline" onFinish={handleFinish}>
          <Form.Item name="keyword">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table style={{marginTop:'10px'}} columns={columns} dataSource={TableData} rowKey={"id"} />
      <Modal
        title={modalType ? "编辑用户" : "新增用户"}
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
       
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelAlign="left"
        >
         {modalType== 1 &&
          <Form.Item
          name="id"
          hidden
          
          >
            <Input />
          </Form.Item>}
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              { required: true, message: "请输入年龄" },
              { type: "number", message: "年龄必须是数字" },
            ]}
          >
            <InputNumber placeholder="请输入年龄名" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "性别是必选" }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { value: 0, label: "男" },
                { value: 1, label: "女" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[{ required: true, message: "请选择出生日期" }]}
          >
            <DatePicker placeholder="请选择" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[{ required: true, message: "请填写地址" }]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default User
