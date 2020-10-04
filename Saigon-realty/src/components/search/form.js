import React from "react";
import { FormattedMessage } from "react-intl";
import { houseTypes } from "../../setting";
import { DropdownButton } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import AutoSuggestInput from "./auto-suggest-input";
import { connect } from "react-redux";
const filter = [
  {
    id: "bedroom",
    label: "bedroom",
    options: [
      {
        text: "1",
        value: 1,
      },
      {
        text: "2",
        value: 2,
      },
      {
        text: "3",
        value: 3,
      },
      {
        text: "4",
        value: 4,
      },
    ],
  },
  {
    id: "bathroom",
    label: "bathroom",
    options: [
      {
        text: "1",
        value: 1,
      },
      {
        text: "2",
        value: 2,
      },
      {
        text: "3",
        value: 3,
      },
      {
        text: "4",
        value: 4,
      },
    ],
  },
  {
    id: "min",
    label: "min",
    options: [
      {
        text: "400",
        value: 400,
      },
      {
        text: "600",
        value: 600,
      },
      {
        text: "800",
        value: 800,
      },
      {
        text: "1000",
        value: 1000,
      },
      {
        text: "1200",
        value: 1200,
      },
    ],
  },
  {
    id: "max",
    label: "max",
    options: [
      {
        text: "600",
        value: 600,
      },
      {
        text: "800",
        value: 800,
      },
      {
        text: "1000",
        value: 1000,
      },
      {
        text: "1200",
        value: 1200,
      },
      {
        text: "1000",
        value: 1000,
      },
      {
        text: "1500",
        value: 1500,
      },
      {
        text: "2000",
        value: 2000,
      },
    ],
  },
];
const allDevices = [
  {
    _id: "5d536bb8c8d95d1cd8c929aa",
    name: "TV",
    name_id: "tv",
    icon: "/images/devices/tv.png",
  },
  {
    _id: "5d536be5ee22891cd8586fcb",
    name: "Balcony",
    name_id: "balcony",
    icon: "/images/devices/balcony.png",
  },
  {
    _id: "5d536c00ee22891cd8586fcc",
    name: "Electric Chimney",
    name_id: "electric_chimney",
    icon: "/images/devices/chimney.png",
  },
  {
    _id: "5d536c12ee22891cd8586fcd",
    name: "Washing Machine",
    name_id: "washing_machine",
    icon: "/images/devices/washing-machine.png",
  },
  {
    _id: "5d536c2aee22891cd8586fce",
    name: "Microwave",
    name_id: "microwave",
    icon: "/images/devices/microwave.png",
  },
  {
    _id: "5d536c35ee22891cd8586fcf",
    name: "Bathtub",
    name_id: "bathtub",
    icon: "/images/devices/bathtub.png",
  },
  {
    _id: "5d536c4fee22891cd8586fd0",
    name: "Smoke Detector",
    name_id: "smoke_detector",
    icon: "/images/devices/smoke-detector.png",
  },
  {
    _id: "5d536c7eee22891cd8586fd1",
    name: "Geyser",
    name_id: "geyser",
    icon: "/images/devices/water-heater.png",
  },
  {
    _id: "5d536c93ee22891cd8586fd2",
    name: "Kitchen",
    name_id: "kitchen",
    icon: "/images/devices/kitchen.png",
  },
  {
    _id: "5d536cb8ee22891cd8586fd3",
    name: "Fire Extinguisher",
    name_id: "fire_extinguisher",
    icon: "/images/devices/fire-extinguisher.png",
  },
  {
    _id: "5d536ccbee22891cd8586fd4",
    name: "Dish Washer",
    name_id: "dish_washer",
    icon: "/images/devices/dishwasher.png",
  },
  {
    _id: "5d536cdaee22891cd8586fd5",
    name: "First Aid Kit",
    name_id: "first_aid_kit",
    icon: "/images/devices/first-aid-kit.png",
  },
  {
    _id: "5d536cffee22891cd8586fd6",
    name: "Air Conditioner",
    name_id: "air_conditioner",
    icon: "/images/devices/air-conditioner.png",
  },
  {
    _id: "5d536d5cee22891cd8586fd9",
    name: "Smart Home",
    name_id: "smart_home",
    icon: "/images/devices/smart-home.png",
  },
  {
    _id: "5d633e807604532c581195af",
    name: "Sofa",
    name_id: "sofa",
    icon: "/images/devices/sofa.png",
  },
  {
    _id: "5d633f997604532c581195b1",
    name: "Side Table",
    name_id: "side_table",
    icon: "/images/devices/side-table.png",
  },
  {
    _id: "5d633fe87604532c581195b2",
    name: "Bookshelf",
    name_id: "bookshelf",
    icon: "/images/devices/bookshelf.png",
  },
  {
    _id: "5d6340637604532c581195b3",
    name: "Table",
    name_id: "table",
    icon: "/images/devices/table.png",
  },
  {
    _id: "5d6340c07604532c581195b4",
    name: "Chair",
    name_id: "chair",
    icon: "/images/devices/chair.png",
  },
  {
    _id: "5d6341cd0fb1ed2c5840f0a2",
    name: "Fridge",
    name_id: "fridge",
    icon: "/images/devices/fridge.png",
  },
  {
    _id: "5d6341ff0fb1ed2c5840f0a3",
    name: "Shower",
    name_id: "shower",
    icon: "/images/devices/shower.png",
  },
  {
    _id: "5d6342360fb1ed2c5840f0a4",
    name: "Spin Dryer",
    name_id: "spin_dryer",
    icon: "/images/devices/spin-dryer.png",
  },
  {
    _id: "5d63428e0fb1ed2c5840f0a5",
    name: "Ensuite Bathroom",
    name_id: "ensuite_bathroom",
    icon: "/images/devices/ensiute-bathroom.png",
  },
  {
    _id: "5d6345c40fb1ed2c5840f0a6",
    name: "Bed",
    name_id: "bed",
    icon: "/images/devices/bed.png",
  },
  {
    _id: "5d6346400fb1ed2c5840f0a7",
    name: "Beside Table",
    name_id: "beside_table",
    icon: "/images/devices/beside-table.png",
  },
  {
    _id: "5d63466b0fb1ed2c5840f0a8",
    name: "Desk",
    name_id: "desk",
    icon: "/images/devices/desk.png",
  },
  {
    _id: "5d6346ab0fb1ed2c5840f0a9",
    name: "Closet",
    name_id: "closet",
    icon: "/images/devices/closet.png",
  },
  {
    _id: "5d6388b50fb1ed2c5840f0af",
    name: "Coffee Table ",
    name_id: "coffee_table",
    icon: "/images/devices/coffee-table.png",
  },
];

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { devices: [], isShowMore: false };
    this.onChange = this.onChange.bind(this);
    this.showMoreSearch = this.showMoreSearch.bind(this);
  }
  showMoreSearch() {
    this.setState({ isShowMore: !this.state.isShowMore });
  }
  onChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === "devices") {
      console.log(event.target.checked);
      if (target.checked) {
        this.setState({
          devices: [...this.state.devices, value],
        });
      } else {
        this.setState({
          devices: this.state.devices.filter((item) => {
            return item !== value;
          }),
        });
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  }
  componentDidMount() {
    this.props.loadAllDevicesRentPage();
  }
  
  render() {
    const { isShowMore } = this.state;
    const { requireFactors } = this.props
    return (
      <div>
        <form className="d-flex justify-content-center" action="/apartment">
          <div className="search-area row d-flex">
            <div className="col-12 col-md-8 col-lg-8">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 form-group">
                  <AutoSuggestInput />
                </div>
                {filter.map((item) => {
                  return (
                    <div
                      class={`col-12 col-md-3 col-lg-3 form-group ${
                        isShowMore ? "" : "mobile-hidden"
                      }`}
                    >
                      <select
                        onChange={this.onChange}
                        className={"form-control"}
                        name={item.id}
                      >
                        <FormattedMessage id={item.label}>
                          {(txt) => <option value="">{txt}</option>}
                        </FormattedMessage>
                        {item.options.map((option) => {
                          return (
                            <option value={option.value}>{option.text}</option>
                          );
                        })}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-12 col-md-4 col-lg-4">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12 form-group">
                  <select
                    className="form-control"
                    name="type"
                    onChange={this.onChange}
                  >
                    <FormattedMessage id="homeType">
                      {(txt) => <option value="">{txt}</option>}
                    </FormattedMessage>
                    {houseTypes.map((type) => {
                      return (
                        <FormattedMessage id={type.id}>
                          {(txt) => <option value={type.value}>{txt}</option>}
                        </FormattedMessage>
                      );
                    })}
                  </select>
                </div>
                <DropdownButton
                  id="amenities"
                  style={{
                    bottom: "0%",
                    borderRadius: "0.25rem",
                  }}
                  title={
                    <FormattedMessage id="homeAutomation">
                      {(txt) => txt}
                    </FormattedMessage>
                  }
                  className={`${
                    isShowMore ? "" : "mobile-hidden"
                  } amenities col-12 col-md-12 col-lg-12`}
                >
                  {requireFactors.map((item, index) => {
                    return (
                      <FormattedMessage id={item.name_id}>
                        {(txt) => (
                          <div class="form-check">
                            <Checkbox
                              onChange={this.onChange}
                              type="checkbox"
                              name={`devices`}
                              id={item._id}
                              value={item._id}
                            />
                            <label class="form-check-label" for={item._id}>
                              {txt}
                            </label>
                          </div>
                        )}
                      </FormattedMessage>
                    );
                  })}
                </DropdownButton>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-12  d-flex justify-content-end">
              <div
                onClick={this.showMoreSearch}
                className="btn btn-secondary btn-sm search-show-more mt-2"
              >
                <FormattedMessage id="seeMore">{(txt) => txt}</FormattedMessage>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-12 text-center">
              <button className="btn btn-danger">
                <FormattedMessage id="search">{(txt) => txt}</FormattedMessage>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const mapState = (state) => ({
  requireFactors: state.devices.requireFactors
})
const mapDispatch = (dispatch) => ({
  loadAllDevicesRentPage: dispatch.devices.loadAllDevicesRentPage 
})
export default connect(mapState, mapDispatch)(SearchForm)
