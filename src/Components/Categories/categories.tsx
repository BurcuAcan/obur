import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import style from './categories.module.scss';
import firestore from '../../Config/firebase';
import { getDocs, collection, getFirestore } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Categories() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [categoryNames, setCategoryNames] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'Categories'));
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name, // dokümandan name özelliğini alıyoruz
                ...doc.data()
            }));
            const names = categoriesData.map(category => category.name);
            setCategoryNames(names);

        };

        fetchCategories();
    }, []);


    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickCategory = (category: string) => {
        console.log(category);  
        navigate('/categoryFiltered', { state: { category } });
    };
    return (
        <div className={style.container}>
            <Button
                sx={{
                    color: 'black'
                }}
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Categories
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                {categoryNames.map((category, index) => (
                    <MenuItem key={index} onClick={() => handleClickCategory(category)}>
                        {category}
                    </MenuItem>
                ))}
            </Menu>
        </div >
    );
}