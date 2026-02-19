<?php

namespace App\Controllers;

class Verificacion extends BaseController
{
    public function index()
    {
        return view('verificacion/camara');
    }

//     public function validar()
// {
//     $json = $this->request->getJSON(true);

//     $imagenBase64 = $json['imagen'];
//     $descriptorCapturado = $json['descriptor'];

//     // Ejemplo: descriptor almacenado en DB
//     $descriptorRegistrado = $this->obtenerDescriptorUsuario();

//     $distancia = $this->distanciaEuclidiana(
//         $descriptorCapturado,
//         $descriptorRegistrado
//     );

//     return $this->response->setJSON([
//         "match" => $distancia < 0.55,
//         "distance" => $distancia
//     ]);
// }

/* private function distanciaEuclidiana($a, $b)
{
    $suma = 0;

    for ($i = 0; $i < count($a); $i++) {
        $suma += pow($a[$i] - $b[$i], 2);
    }

    return sqrt($suma);
} */

}
