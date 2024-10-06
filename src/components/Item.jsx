import React from 'react';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const Item = ({ item, refreshStudent, refreshTeacher, setRefreshStudent, setRefreshTeacher }) => {
    function handleDeleteUser(user) {
        if(user.job){
            fetch(`http://localhost:3000/teachers/${user.id}`, { method:"DELETE"})
            .then(res => {
                setRefreshTeacher(!refreshTeacher)
            })
        }
        else{
            fetch(`http://localhost:3000/students/${user.id}`, { method:"DELETE"})
            .then(res => {
                setRefreshStudent(!refreshStudent)
            })
        }
    }

    return (
        <>
            <Card
                style={{
                    width: 300,
                }}
                actions={[
                    <DeleteOutlined onClick={() => handleDeleteUser(item)} className='hover:!text-red-500 scale-125' key="delete" />,
                    <EditOutlined className='scale-125' key="edit" />,
                    <EllipsisOutlined className='scale-125' key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={`${item.name} - ${item.surname}`}
                    description={item.study ? item.study : item.job}
                />
            </Card>
        </>
    )
};
export default Item;