import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import React from 'react';
import { Card, Col, Row, Image, Typography } from 'antd';
import { Dispatch } from 'redux';
import { getCard } from '../../store/getICard';
import { Card as CustomCard } from '@/interface/interfaces';
const { Paragraph } = Typography;

const CardProduct = () => {
  const dispatch = useDispatch<Dispatch<any>>();
  const users = useSelector((state: any) => state.reducerCard.cards);

  useEffect(() => {
    dispatch(getCard());
  }, []);

  return (
    < Row gutter={[24, 24]} >
      {users?.map((user: CustomCard) => (
        <Col span={6} key={user.id} >
          <Card title={user.name} bordered={false}>
            <Image src={user.imageUrl} alt={user.name} />
            <Paragraph>
              <b>Price:</b> {user.price}
            </Paragraph>
            <Paragraph>
              <b>Count:</b> {user.count}
            </Paragraph>
            <Paragraph>
              <b>Size:</b> {user.size.height} &#215; {user.size.width}
            </Paragraph>
          </Card>
        </Col >
      ))
      }
    </ Row >
  )
}

export default CardProduct
