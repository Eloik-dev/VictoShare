<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias(['csrf' => \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class]);
        $middleware->append(\Illuminate\Http\Middleware\HandleCors::class);
        $middleware->append(\Illuminate\Session\Middleware\StartSession::class);
        $middleware->append(\Illuminate\Cookie\Middleware\EncryptCookies::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
