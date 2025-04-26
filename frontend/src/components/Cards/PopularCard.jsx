import React from 'react'
import "../Cards/card.css";
import { Card ,Stack} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
// import image from '../../assets/Anchorage To La Paz.jpg'

const PopularCard = ({val}) => {
  console.log(val.image)
  console.log(val)
  return (
    <>
        <Card className="rounded-2 shadow-sm popular">
              <Card.Img
                variant="top"
                src={val.image}
                // src={"../../assets/Anchorage To La Paz.jpg"}
                className="img-fluid"
                alt={"image"}
              />
              <Card.Body>
              
                <Card.Text>
                  <i className="bi bi-geo-alt"></i>
                  {/* <span className="text">{val.location}</span> */}
                  <span className="text">{val.description}</span>

                </Card.Text>

                <Card.Title><NavLink className="body-text text-dark text-decoration-none" to={`/tour-details/${val.id}`}> {val?.name} </NavLink></Card.Title>
                <p className="reviwe">
                  <span>
                    <i className="bi bi-star-fill me-1"></i>
                  </span>
                  <span>{val.rating} </span>
                  {/* <span>( {val.reviews} reviews )</span> */}
                  <span>( 0 reviews )</span>

                </p>
                {
                // val.category.map((cat, index)=>{
                //   return(
                //     <span key={index} 
                //     className={cat.replace(/ .*/, "") + " badge"}>{cat}</span>
                //   )
                // })
                <span key={"0"} 
                    className={"River Cruise badge"}>{"River Cruise"}</span>
                }
                
              </Card.Body>

              <Card.Footer className="py-4">
                {val.afterDiscount ? (
                  <p className="text-decoration-line-through"> ${val.price}</p>
                ): ""}
               
                <Stack
                  direction="horizontal"
                  className="justify-content-between  mt-3"
                >
                  
                  <p>
                    From <b>{val.afterDiscount ? val.afterDiscount : val.price}</b>
                  </p>
                    {/* <p>
                    From <b>{val.price}</b>
                  </p> */}
                  <p>
                  
                    <i className="bi bi-clock"></i> {val.duration}
                  </p>
                </Stack>
              </Card.Footer>
            </Card>
    </>
  )
}

export default PopularCard