<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->get('/verificacion', 'Verificacion::index');

$routes->post('/verificacion/validar', 'Verificacion::validar');
