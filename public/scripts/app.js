var ProductCategoryRow = React.createClass({
    render: function () {
        return (<tr className="categoryRow"><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    render: function () {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{ color: "red" }}>{this.props.product.name}</span>;

        return (
            <tr className="productRow">
                <td>{name}</td>
                <td>{this.props.product.name}</td>
            </tr>
        );
    }
});

var ProductTable = React.createClass({
    render: function () {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function (product) {
            // check if it is a different category of a product
            product.category !== lastCategory && (rows.push(<ProductCategoryRow category={product.category} key={product.category} />));

            // push the row with the product
            rows.push(<ProductRow product={product} key={product.name} />);

            // set the category
            lastCategory = product.category;
        });

        return (
            <table className="productTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    render: function () {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <label>
                    <p>
                        <input type="checkbox" />
                        {" "}
                        Only show products in stock
                    </p>
                </label>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    render: function () {
        return (
            <div>
                <SearchBar />
                <ProductTable products={this.props.products} />
            </div>
        );
    }
});

var PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('container')
);