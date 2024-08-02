import style from './location.module.scss'
import LocationOnSharpIcon from '@mui/icons-material/LocationOnSharp';
function Location(props: any) {
    return (
        <div className={style["container"]}>
            <div className={style["location"]}>
                <div className={style["bar"]}>
                    <div className={style["icon"]}>
                        <LocationOnSharpIcon></LocationOnSharpIcon>
                    </div>
                    <div className={style["text"]}>
                        Akdeniz Üniversitesi, Pınarbaşı Mah. Dumlupınar Bulvarı
                        07070 Kampüs Konyaaltı/Antalya/TÜRKİYE
                    </div>


                </div>

            </div>
        </div>
    )

}
export default Location;