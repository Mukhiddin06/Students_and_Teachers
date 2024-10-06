import { Button, Input, Select } from 'antd'
import './App.css'
import Item from './components/Item'
import { useEffect, useState } from 'react'

function App() {
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [statusUser, setStatusUser] = useState("1")
  const [refreshStudent, setRefreshStudent] = useState(false)
  const [refreshTeacher, setRefreshTeacher] = useState(false)
  function handleSubmit(e){
    e.preventDefault()
    const data ={
      name:e.target.name.value,
      surname:e.target.surname.value,
    }
    if(statusUser == "1"){
      data.study = e.target.jobOrStudy.value
      fetch("http://localhost:3000/students", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        setRefreshStudent(!refreshStudent)
      })
    }
    else{
      data.job = e.target.jobOrStudy.value
      fetch("http://localhost:3000/teachers", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        setRefreshTeacher(!refreshTeacher)
      })
    }
  }

  useEffect(() => {
    fetch("http://localhost:3000/students").then(res => res.json())
    .then(data => setStudents(data))
  }, [refreshStudent])


  useEffect(() => {
    fetch("http://localhost:3000/teachers").then(res => res.json())
    .then(data => setTeachers(data))
  }, [refreshTeacher])

  return (
    <>
      <form onSubmit={handleSubmit} autoComplete='off' className='w-[600px] p-5 rounded-md bg-slate-300 mx-auto mb-10 mt-5'>
        <div className='flex items-center justify-between space-x-5'>
          <div className='flex flex-col w-[50%] space-y-5'>
            <Select
              value={statusUser}
              showSearch
              allowClear
              size='large'
              placeholder="Select a person"
              optionFilterProp="label"
              onChange={(e) => setStatusUser(e)}
              options={[
                {
                  value: '1',
                  label: 'Student',
                },
                {
                  value: '2',
                  label: 'Teacher',
                },
              ]}
            />
            <Input className='w-full' size='large' allowClear name='jobOrStudy' type='text' placeholder={`Enter ${statusUser == "1" ? "study" : "job"}`} />
          </div>
          <div className='flex flex-col w-[50%] space-y-5'>
            <Input name='name' className='w-full' size='large' allowClear type='text' placeholder='Enter name' />
            <Input name='surname' className='w-full' size='large' allowClear type='text' placeholder='Enter surname' />
          </div>
        </div>
        <Button htmlType='submit' className='w-full mt-5' size='large' type='primary'>Add {statusUser == "1" ? "Student" : "Teacher"}</Button> 
      </form>
      <div className='flex justify-center gap-20 p-10'>
        <ul className='bg-slate-300 p-5 rounded-lg space-y-5'>
          {students.map(item => <Item refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent} refreshTeacher={refreshTeacher} setRefreshTeacher={setRefreshTeacher} key={item.id} item={item} />)}
        </ul>
        <ul className='bg-slate-300 p-5 rounded-lg space-y-5'>
          {teachers.map(item => <Item refreshStudent={refreshStudent} setRefreshStudent={setRefreshStudent} refreshTeacher={refreshTeacher} setRefreshTeacher={setRefreshTeacher} key={item.id} item={item} />)}
        </ul>
      </div>
    </>
  )
}

export default App
