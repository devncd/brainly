import { Card } from "../components/Card"

export const Dashboard = () => {
    return (
        <>
            {/* collections */}
            <div className='flex flex-wrap gap-4 p-4 pt-2'>
                <Card
                title={"First video"}
                link={"https://www.youtube.com/watch?v=T_o542Ujj5o"}
                type={'video'}
                tags={['geopolitics', 'india-pak']} />

                <Card
                title={"First tweet"}
                link={"https://x.com/adamtaylorl/status/1955585624272253382"}
                type={'article'}
                tags={['ai', 'gemini']} />

                <Card
                title={"River front Kota Rajasthan India lorem ipsum"}
                link={"https://cdn2.iguzzini.com/getmedia/c91a2159-7725-4e1e-90c4-87c7f45f0bbf/03_Chambal-Riverfront?width=1500&height=1000"}
                type={'image'}
                tags={['kota', 'city']} />
            </div>
        </>
    )
}