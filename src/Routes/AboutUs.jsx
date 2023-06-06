import person1 from "../img/person1.jpg"
import person2 from "../img/person2.jpg"
import person3 from "../img/person3.jpg"
import person4 from "../img/person4.jpg"
const AboutUs = () => {
    return (
        <main>
            <div className='default_container'>
                <h1 className="zagolovok self_center">Над проектом работали</h1>
                <section className="about_us_persons">
                    <div>
                        <div>
                            <img src={person1} alt="" />
                            <p>Бушуев Максим</p>
                        </div>
                        <div>
                            <img src={person2} alt="" />
                            <p>Пащенко Владислав</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={person3} alt="" />
                            <p>Бугутдинов Даниил</p>
                        </div>
                        <div>
                            <img src={person4} alt="" />
                            <p>Широковский Данил</p>
                        </div>
                    </div>                       
                </section>
            </div>
        </main>
    )
}

export {AboutUs}