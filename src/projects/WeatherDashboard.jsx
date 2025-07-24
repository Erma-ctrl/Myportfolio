import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Search, MapPin, Thermometer, Droplets, Wind, Eye, Sun, Cloud, CloudRain, ArrowLeft, RefreshCw, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Enhanced mock weather data with more cities
  const mockWeatherData = {
    'addis ababa': {
      current: {
        location: 'Addis Ababa, Ethiopia',
        temperature: 22,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        uvIndex: 6,
        pressure: 1013,
        feelsLike: 24,
        icon: 'partly-cloudy'
      },
      forecast: [
        { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy', icon: 'partly-cloudy', humidity: 65, wind: 12 },
        { day: 'Tomorrow', high: 26, low: 19, condition: 'Sunny', icon: 'sunny', humidity: 55, wind: 8 },
        { day: 'Wednesday', high: 23, low: 17, condition: 'Cloudy', icon: 'cloudy', humidity: 70, wind: 15 },
        { day: 'Thursday', high: 21, low: 16, condition: 'Light Rain', icon: 'rainy', humidity: 85, wind: 18 },
        { day: 'Friday', high: 25, low: 18, condition: 'Sunny', icon: 'sunny', humidity: 60, wind: 10 }
      ]
    },
    'london': {
      current: {
        location: 'London, United Kingdom',
        temperature: 15,
        condition: 'Cloudy',
        humidity: 78,
        windSpeed: 18,
        visibility: 8,
        uvIndex: 3,
        pressure: 1008,
        feelsLike: 13,
        icon: 'cloudy'
      },
      forecast: [
        { day: 'Today', high: 16, low: 12, condition: 'Cloudy', icon: 'cloudy', humidity: 78, wind: 18 },
        { day: 'Tomorrow', high: 14, low: 10, condition: 'Light Rain', icon: 'rainy', humidity: 85, wind: 22 },
        { day: 'Wednesday', high: 17, low: 13, condition: 'Partly Cloudy', icon: 'partly-cloudy', humidity: 70, wind: 15 },
        { day: 'Thursday', high: 19, low: 14, condition: 'Sunny', icon: 'sunny', humidity: 65, wind: 12 },
        { day: 'Friday', high: 16, low: 11, condition: 'Cloudy', icon: 'cloudy', humidity: 75, wind: 16 }
      ]
    },
    'new york': {
      current: {
        location: 'New York, United States',
        temperature: 28,
        condition: 'Sunny',
        humidity: 55,
        windSpeed: 8,
        visibility: 15,
        uvIndex: 8,
        pressure: 1015,
        feelsLike: 30,
        icon: 'sunny'
      },
      forecast: [
        { day: 'Today', high: 30, low: 22, condition: 'Sunny', icon: 'sunny', humidity: 55, wind: 8 },
        { day: 'Tomorrow', high: 32, low: 24, condition: 'Partly Cloudy', icon: 'partly-cloudy', humidity: 60, wind: 10 },
        { day: 'Wednesday', high: 29, low: 21, condition: 'Cloudy', icon: 'cloudy', humidity: 65, wind: 12 },
        { day: 'Thursday', high: 27, low: 20, condition: 'Light Rain', icon: 'rainy', humidity: 80, wind: 15 },
        { day: 'Friday', high: 31, low: 23, condition: 'Sunny', icon: 'sunny', humidity: 50, wind: 6 }
      ]
    },
    'tokyo': {
      current: {
        location: 'Tokyo, Japan',
        temperature: 18,
        condition: 'Partly Cloudy',
        humidity: 72,
        windSpeed: 14,
        visibility: 12,
        uvIndex: 5,
        pressure: 1012,
        feelsLike: 19,
        icon: 'partly-cloudy'
      },
      forecast: [
        { day: 'Today', high: 20, low: 15, condition: 'Partly Cloudy', icon: 'partly-cloudy', humidity: 72, wind: 14 },
        { day: 'Tomorrow', high: 22, low: 17, condition: 'Sunny', icon: 'sunny', humidity: 65, wind: 10 },
        { day: 'Wednesday', high: 19, low: 14, condition: 'Cloudy', icon: 'cloudy', humidity: 78, wind: 16 },
        { day: 'Thursday', high: 17, low: 12, condition: 'Light Rain', icon: 'rainy', humidity: 85, wind: 20 },
        { day: 'Friday', high: 21, low: 16, condition: 'Sunny', icon: 'sunny', humidity: 68, wind: 12 }
      ]
    },
    'paris': {
      current: {
        location: 'Paris, France',
        temperature: 20,
        condition: 'Sunny',
        humidity: 60,
        windSpeed: 10,
        visibility: 14,
        uvIndex: 7,
        pressure: 1016,
        feelsLike: 22,
        icon: 'sunny'
      },
      forecast: [
        { day: 'Today', high: 22, low: 16, condition: 'Sunny', icon: 'sunny', humidity: 60, wind: 10 },
        { day: 'Tomorrow', high: 24, low: 18, condition: 'Partly Cloudy', icon: 'partly-cloudy', humidity: 65, wind: 12 },
        { day: 'Wednesday', high: 21, low: 15, condition: 'Cloudy', icon: 'cloudy', humidity: 70, wind: 14 },
        { day: 'Thursday', high: 19, low: 13, condition: 'Light Rain', icon: 'rainy', humidity: 80, wind: 18 },
        { day: 'Friday', high: 23, low: 17, condition: 'Sunny', icon: 'sunny', humidity: 58, wind: 8 }
      ]
    }
  };

  useEffect(() => {
    const savedFavorites = localStorage.getItem('weatherFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedHistory = localStorage.getItem('weatherHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }

    // Load default weather for Addis Ababa
    searchWeather('Addis Ababa');
  }, []);

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const getWeatherIcon = (iconType, size = 48) => {
    const iconProps = { size, className: 'text-primary' };
    switch (iconType) {
      case 'sunny': return <Sun {...iconProps} className="text-warning" />;
      case 'partly-cloudy': return <Cloud {...iconProps} className="text-info" />;
      case 'cloudy': return <Cloud {...iconProps} className="text-secondary" />;
      case 'rainy': return <CloudRain {...iconProps} className="text-primary" />;
      default: return <Sun {...iconProps} />;
    }
  };

  const searchWeather = async (searchCity) => {
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const cityKey = searchCity.toLowerCase();
      const weatherData = mockWeatherData[cityKey];
      
      if (weatherData) {
        setWeather(weatherData.current);
        setForecast(weatherData.forecast);
        setError('');
        setLastUpdated(new Date());
        
        // Add to search history
        const newHistory = [searchCity, ...searchHistory.filter(h => h.toLowerCase() !== cityKey)].slice(0, 5);
        setSearchHistory(newHistory);
      } else {
        setError(`Weather data not available for "${searchCity}". Try "Addis Ababa", "London", "New York", "Tokyo", or "Paris".`);
        setWeather(null);
        setForecast([]);
      }
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      searchWeather(city.trim());
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
          searchWeather('Addis Ababa'); // Demo: use Addis Ababa as current location
        },
        (error) => {
          setError('Unable to get your location. Please search manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const toggleFavorite = (location) => {
    const isFavorite = favorites.includes(location);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav !== location));
    } else {
      setFavorites([...favorites, location]);
    }
  };

  const refreshWeather = () => {
    if (weather) {
      const currentCity = weather.location.split(',')[0];
      searchWeather(currentCity);
    }
  };

  const getUVIndexColor = (uvIndex) => {
    if (uvIndex <= 2) return 'success';
    if (uvIndex <= 5) return 'warning';
    if (uvIndex <= 7) return 'danger';
    return 'dark';
  };

  const getUVIndexText = (uvIndex) => {
    if (uvIndex <= 2) return 'Low';
    if (uvIndex <= 5) return 'Moderate';
    if (uvIndex <= 7) return 'High';
    return 'Very High';
  };

  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Link to="/" className="btn btn-outline-primary me-3">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="display-4 fw-bold text-primary mb-0">Weather Dashboard</h1>
                <p className="lead text-muted mb-0">Get real-time weather information for any city</p>
              </div>
            </div>
            {weather && (
              <Button
                variant="outline-primary"
                onClick={refreshWeather}
                disabled={loading}
              >
                <RefreshCw size={18} className={loading ? 'spin' : ''} />
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="mb-4">
        <Col lg={8} className="mx-auto">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <Form onSubmit={handleSearch}>
                <Row className="g-3">
                  <Col md={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter city name (e.g., Addis Ababa, London, New York, Tokyo, Paris)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      size="lg"
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="w-100"
                      disabled={loading}
                    >
                      {loading ? <Spinner size="sm" /> : <Search size={20} />}
                    </Button>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      className="w-100"
                      onClick={getCurrentLocation}
                      disabled={loading}
                    >
                      <MapPin size={20} />
                    </Button>
                  </Col>
                </Row>
              </Form>

              {/* Quick Access */}
              {(searchHistory.length > 0 || favorites.length > 0) && (
                <Row className="mt-3">
                  <Col>
                    {favorites.length > 0 && (
                      <div className="mb-2">
                        <small className="text-muted me-2">Favorites:</small>
                        {favorites.map((fav, index) => (
                          <Badge
                            key={index}
                            bg="primary"
                            className="me-2 mb-1 cursor-pointer"
                            onClick={() => searchWeather(fav)}
                            style={{ cursor: 'pointer' }}
                          >
                            <Star size={12} className="me-1" />
                            {fav}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {searchHistory.length > 0 && (
                      <div>
                        <small className="text-muted me-2">Recent:</small>
                        {searchHistory.map((city, index) => (
                          <Badge
                            key={index}
                            bg="secondary"
                            className="me-2 mb-1 cursor-pointer"
                            onClick={() => searchWeather(city)}
                            style={{ cursor: 'pointer' }}
                          >
                            {city}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Error Alert */}
      {error && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <Alert variant="warning" className="text-center">
              {error}
            </Alert>
          </Col>
        </Row>
      )}

      {/* Current Weather */}
      {weather && (
        <Row className="mb-4">
          <Col lg={8} className="mx-auto">
            <Card className="border-0 shadow-lg">
              <Card.Body className="text-center py-5">
                <div className="d-flex align-items-center justify-content-center mb-3">
                  <MapPin size={20} className="text-muted me-2" />
                  <h3 className="mb-0">{weather.location}</h3>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => toggleFavorite(weather.location.split(',')[0])}
                    className="ms-2"
                  >
                    <Star 
                      size={20} 
                      fill={favorites.includes(weather.location.split(',')[0]) ? 'currentColor' : 'none'}
                      className={favorites.includes(weather.location.split(',')[0]) ? 'text-warning' : 'text-muted'}
                    />
                  </Button>
                </div>
                
                <div className="mb-4">
                  {getWeatherIcon(weather.icon, 80)}
                </div>
                
                <h1 className="display-1 fw-bold text-primary mb-2">{weather.temperature}°C</h1>
                <h4 className="text-muted mb-2">{weather.condition}</h4>
                <p className="text-muted mb-4">Feels like {weather.feelsLike}°C</p>
                
                {lastUpdated && (
                  <small className="text-muted">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </small>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Weather Details */}
      {weather && (
        <Row className="mb-4">
          <Col lg={10} className="mx-auto">
            <Row className="g-3">
              <Col md={2}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body>
                    <Droplets size={24} className="text-info mb-2" />
                    <h5 className="text-info">{weather.humidity}%</h5>
                    <small className="text-muted">Humidity</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body>
                    <Wind size={24} className="text-success mb-2" />
                    <h5 className="text-success">{weather.windSpeed} km/h</h5>
                    <small className="text-muted">Wind Speed</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body>
                    <Eye size={24} className="text-warning mb-2" />
                    <h5 className="text-warning">{weather.visibility} km</h5>
                    <small className="text-muted">Visibility</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body>
                    <Sun size={24} className={`text-${getUVIndexColor(weather.uvIndex)} mb-2`} />
                    <h5 className={`text-${getUVIndexColor(weather.uvIndex)}`}>{weather.uvIndex}</h5>
                    <small className="text-muted">UV Index</small>
                    <div>
                      <Badge bg={getUVIndexColor(weather.uvIndex)} className="mt-1">
                        {getUVIndexText(weather.uvIndex)}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body>
                    <Thermometer size={24} className="text-primary mb-2" />
                    <h5 className="text-primary">{weather.pressure} hPa</h5>
                    <small className="text-muted">Pressure</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={2}>
                <Card className="text-center border-0 shadow-sm h-100">
                  <Card.Body>
                    <Thermometer size={24} className="text-secondary mb-2" />
                    <h5 className="text-secondary">{weather.feelsLike}°C</h5>
                    <small className="text-muted">Feels Like</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      )}

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <Row>
          <Col lg={10} className="mx-auto">
            <h3 className="text-center mb-4">5-Day Forecast</h3>
            <Row className="g-3">
              {forecast.map((day, index) => (
                <Col key={index} md={2} className="text-center">
                  <Card className="border-0 shadow-sm h-100">
                    <Card.Body>
                      <h6 className="fw-bold mb-3">{day.day}</h6>
                      <div className="mb-3">
                        {getWeatherIcon(day.icon, 32)}
                      </div>
                      <div className="mb-2">
                        <div className="fw-bold text-primary">{day.high}°</div>
                        <div className="text-muted">{day.low}°</div>
                      </div>
                      <small className="text-muted d-block mb-2">{day.condition}</small>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Droplets size={12} className="text-info me-1" />
                          <small>{day.humidity}%</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <Wind size={12} className="text-success me-1" />
                          <small>{day.wind}km/h</small>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WeatherDashboard;