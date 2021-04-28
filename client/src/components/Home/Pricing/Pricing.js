import React from "react";

const pricing = [
  {
    category: "Basic",
    price: 50,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum quasi eligendi consequuntur sit praesentium veniam tenetur repellat deserunt amet quae.",
  },
  {
    category: "Standard",
    price: 75,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum quasi eligendi consequuntur sit praesentium veniam tenetur repellat deserunt amet quae.",
  },
  {
    category: "Premium",
    price: 100,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum quasi eligendi consequuntur sit praesentium veniam tenetur repellat deserunt amet quae.",
  },
];
const Pricing = () => {
  return (
    <section className="testimonials container my-5 py-5">
      <div className="container">
        <div className="section-header text-center">
          <h2 className='text-info'>
            Pricing
          </h2>
        </div>
        <div className="card-deck mt-5">
          {pricing.map(price => (
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="card-text text-center">{price.category}</h4>
              </div>
              <div>
                <h4 className="card-text text-center">${price.price} Per Month</h4>
                <div className="card-footer">
                  <small>{price.description}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
