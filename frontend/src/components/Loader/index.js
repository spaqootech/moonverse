import loadingImg from '../../img/loading.png';

export default function LoadingImg() {
    return (
        <div className='loading-container'>
            <img src={loadingImg} alt="loading..."/>
        </div>
    )
}