import React from 'react';
import trainer1 from '../../../images/trainer 1.jpg';
import trainer2 from '../../../images/trainer 2.jpg';
import trainer3 from '../../../images/trainer 3.jpg';
import './Trainer.css';
const trainers = [
    {
      name: "Ema Gomez ",
      from: "California",
      img: trainer1,
    },
    {
      name: "Wilson Harry",
      from: "California",
      img: trainer2,
    },
    {
      name: "Aliz Farari",
      from: "California",
      img: trainer3,
    },
  ];
const Trainer = () => {
    return (
        <section className="trainer container my-5 py-5">
      <div className="container">
        <div className="section-header text-center">
          <h1 className='text-info'>
            Our Trainers
          </h1>
        </div>
        <div className="card-deck mt-5">
          {trainers.map(trainer => (
            <div className="card shadow-sm">
              <div className="d-flex justify-content-center m-3">
                <img className="mx-3 img-fluid" src={trainer.img} alt="" width="250px" />
              </div>
              <div className="card-body">
                <p className="card-text text-center">{trainer.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default Trainer;