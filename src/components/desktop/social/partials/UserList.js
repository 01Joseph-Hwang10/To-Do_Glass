import React from 'react'
import UserCard from './UserCard'
// import PropTypes from 'prop-types'

function UserList(props) {

    const items = props.items
    const ids = props.ids
    const permission = props.permission
    const action = props.action

    return (
        <div className="w-full">
            {
                ids && ids.length >0 ? (
                    <>
                    {
                        ids.map(id => {
                            let item
                            if(items) item = items.find(element => Number(element.url.split('/').filter(Boolean).reverse()[0]) === Number(id))
                            return (
                                <UserCard 
                                key={id}
                                id={id}
                                item={item}
                                permission={permission}
                                action={action}
                                update={props.update}
                                />
                            )
                        })
                    }
                    </>
                ) : (
                    <div className="ml-1"><span>No Users</span></div>
                )
            }
        </div>
    )
}

// UserList.propTypes = {

// }

export default UserList

