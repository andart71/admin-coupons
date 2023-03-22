import { Button, Grid, TextField, Alert } from '@mui/material';
import React, { useState } from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';

const App = () => {

  const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [desct, setDesct] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [rest, setRest] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [coupon, setCoupon] = useState('');
    const [cat, setCat] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [username, setUsername] = useState('');

    const handleChangeName = (event: any) => {
      setName(event.target.value);
  }

  const handleChangeImage = (event: any) => {
      setImage(event.target.value);
  }

  const handleChangeDesc = (event: any) => {
      setDesct(event.target.value);
  }

  const handleChangeDateStart = (event: any) => {
      setStartDate(event.target.value);
  }

  const handleChangeDateFinish = (event: any) => {
      setFinishDate(event.target.value);
  }

  const handleChangeRest = (event: any) => {
      setRest(event.target.value);
  }

  const handleChangeOldPrice = (event: any) => {
      setOldPrice(event.target.value);
  }

  const handleChangeNewPrice = (event: any) => {
      setNewPrice(event.target.value);
  }

  const handleChangeCoupon = (event: any) => {
      setCoupon(event.target.value);
  }

  const handleChangeCat = (event: any) => {
      setCat(event.target.value);
  }

  const handleChangeUsername = (event: any) => {
    setUsername(event.target.value);
  }

  const handleClick = async() => {
    setError('');
    setSuccess('')
      if (name && desct && image && finishDate && rest && cat) {
        const fullItems = await axios.get('https://cupons-server.vercel.app/getItems?id=0');
        fullItems.data.sort((a: any, b: any) => a.id > b.id ? 1 : -1);
        console.log(fullItems.data, '[NEW ARRAY]');
        const lastId = fullItems.data.length;
        const { data } = await axios.post(`https://cupons-server.vercel.app/addCoupon`, { id: lastId, name: name, desct: desct, image: image, start_date: startDate, finish_date: finishDate, rest: rest, old_price: oldPrice, new_price: newPrice, coupon: coupon, id_category: cat, username: username});
        console.log(data, '[data]')
        if (data.status === 'success') {
            setSuccess('Купон успешно добавлен!')
        } else {
            setError('Произошла ошибка при добавлении купона!')
        }
      } else {
        setError('Обязательные поля не заполнены')
      }
  }

  return (
    <Paper style={{ padding: '20px' }} elevation={3}>
        {error && <><Alert severity="error">{error}</Alert><br /></>}
        {success && <><Alert severity="success">{success}</Alert><br /></>}
      <Grid item xs={8} sm={8} md={8} xl={12} key={1}>
        <TextField label="Название *" onChange={handleChangeName} name="name" /><br /><br />
        <TextField label="Ссылка на картинку *" onChange={handleChangeImage} name="image" /><br /><br />
        <TextField label="Описание *" onChange={handleChangeDesc} name="description" multiline={true} /><br /><br />
        <TextField label="Дата начала *" onChange={handleChangeDateStart} name="start_date" /><br /><br />
        <TextField label="Дата окончания *" onChange={handleChangeDateFinish} name="finish_date" /><br /><br />
        <TextField label="Торговая точка *" onChange={handleChangeRest} name="rest" /><br /><br />
        <TextField label="Старая цена" onChange={handleChangeOldPrice} name="old_price" /><br /><br />
        <TextField label="Новая цена *" onChange={handleChangeNewPrice} name="new_price" /><br /><br />
        <TextField label="Купон (при наличии)" onChange={handleChangeCoupon} name="coupon" /><br /><br />
        <TextField label="ID категории *" onChange={handleChangeCat} name="category" /><br /><br />
        <TextField label="Имя пользователя" onChange={handleChangeUsername} name="username" /><br /><br />
        <Button onClick={handleClick} variant="contained">Отправить</Button>
        </Grid>
    </ Paper>
  );
}

export default App;
