import React from 'react'

const Product = () => {
    let data = [
        { _id: 1, name: "Bag", price: 10000, quantity: 10, pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREeidoNtXhdASmbpqw2BRjfVL2SGnQUL-iozp7Db_quw&s" },
        { _id: 2, name: "Camera", price: 200000, quantity: 20, pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLOk1EKjHbCZUKmLVpTblAwD_XQaeV2FSpNqae-cmIoQ&s=10" }
    ]

    return (<div>{

        data.map((item, i) => {
            return (<div>
                <img src={item.pic} width="200px" height="200px"></img>
                <p>Name: {item.name}</p>
                <p>Price: {item.price}</p>
                <p>Quantiry: {item.quanity}</p>
            </div>)
        })


    }
    </div>)
}

export default Product