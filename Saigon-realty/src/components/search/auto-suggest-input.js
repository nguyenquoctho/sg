import React from "react";
import Autocomplete from "react-autocomplete";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

const menuStyle = {
  position: "absolute",
  zIndex: "10",
  top: "38px",
  left: "0",
  borderBottomLeftRadius: "4px",
  borderBottomRightRadius: "4px",
  border: "1px solid #aaa",
};
const wrapperStyle = {
  position: "relative",
  width: "100%",
  display: "inline-block",
};
class AutoSuggestInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      search: value,
    });
  }
  render() {
    const { projects = [] } = this.props;
    return (
      <>
        <Autocomplete
          getItemValue={(item) => item.name}
          items={projects.filter((item) => {
            const reg = new RegExp(this.state.search, "gi");
            return item.name.match(reg) || item.district.match(reg);
          })}
          renderInput={(props) => (
            <FormattedMessage id="searchPlaceHolder">
              {(txt) => (
                <input
                  {...props}
                  name="search"
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder={txt}
                />
              )}
            </FormattedMessage>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className="suggest-search"
              style={{
                background: isHighlighted ? "lightgray" : "white",
              }}
            >
              {item.name}
            </div>
          )}
          menuStyle={menuStyle}
          wrapperStyle={wrapperStyle}
          onChange={this.handleChange}
          value={this.state.search}
          onSelect={(value) => this.setState({ search: value })}
        />
      </>
    );
  }
}
const mapState = (state) => ({
  projects: state.projects.projects,
});
const mapDispatch = (dispatch) => ({});
export default connect(mapState, mapDispatch)(AutoSuggestInput);
