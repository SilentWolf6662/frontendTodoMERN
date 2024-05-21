export const Todo = ({ data }) => {
    const imageSrc = data.image ? `http://localhost:5000/images/${data.image}` : 'https://placehold.co/64'
    return (
        <div className={`border ${data.done ? 'border-lime-600' : 'border-red-600'} shadow-xl card w-96 card-bordered bg-neutral`}>
            <div></div>
            <div className='card-body'>
                <h2 className='card-title'>{data.title}</h2>
                {/* <p className='bg-red'>{data.description}</p> */}
                <img src={`${imageSrc}`} alt={data.title} className='w-12 invert' />
                <div className={`badge badge-neutral bg-slate-950/30 p-3`}>{data.category}</div>
            </div>
            <div className={`ml-8 badge badge-neutral ${data.done ? 'bg-green-900' : 'bg-red-900'} p-3`}>{data.done ? 'Completed' : 'Uncompleted'}</div>
        </div>
    )
}