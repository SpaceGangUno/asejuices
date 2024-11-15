import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Filter, Search, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/firestore';
import { Product } from '../types/models';

const categories = ['All', 'Detox', 'Immunity', 'Energy', 'Antioxidant'];

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState<{ [key: string]: boolean }>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      name: product.name,
      price: product.price,
      quantity: 1
    });
    
    setAddedToCart({ ...addedToCart, [product.id]: true });
    setTimeout(() => {
      setAddedToCart({ ...addedToCart, [product.id]: false });
    }, 2000);
  };

  const toggleProductDetails = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-emerald-900 mb-4 text-center">Our Products</h2>
          <p className="text-emerald-600 text-center max-w-2xl mx-auto">
            Discover our range of cold-pressed juices, carefully crafted to support your wellness journey.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-emerald-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-full border border-emerald-200 px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900">{product.name}</h3>
                    <p className="text-emerald-600">{product.category}</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{product.description}</p>

                <button
                  onClick={() => toggleProductDetails(product.id)}
                  className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
                >
                  {expandedProduct === product.id ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      <span>Show More</span>
                    </>
                  )}
                </button>

                {expandedProduct === product.id && (
                  <div className="space-y-4 mb-4">
                    {product.benefits.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-emerald-900 mb-2">Benefits</h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {product.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.ingredients.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-emerald-900 mb-2">Ingredients</h4>
                        <p className="text-gray-600">{product.ingredients.join(', ')}</p>
                      </div>
                    )}

                    <div>
                      <h4 className="font-semibold text-emerald-900 mb-2">Nutrition Facts</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>Calories: {product.nutrition.calories}</div>
                        <div>Protein: {product.nutrition.protein}g</div>
                        <div>Carbs: {product.nutrition.carbs}g</div>
                        <div>Fiber: {product.nutrition.fiber}g</div>
                      </div>
                    </div>

                    {product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-emerald-900">${product.price.toFixed(2)}</span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition ${
                      addedToCart[product.id]
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                    disabled={!product.inStock}
                  >
                    {addedToCart[product.id] ? (
                      <>
                        <Check className="h-5 w-5" />
                        <span>Added</span>
                      </>
                    ) : !product.inStock ? (
                      <span>Out of Stock</span>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
