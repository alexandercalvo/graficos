using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using teststatics.Models;

namespace teststatics.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public string test ()
        {
            List<Sales> sales = new List<Sales>();
            List<Sales> sales1 = new List<Sales>();
            List<List<Sales>> listSale = new List<List<Sales>>();
            
            Sales sale = new Sales();
            Sales sale1 = new Sales();

            sale.mes = "Enero";
            sale.value = 30000000;
            sales.Add(sale);

            sale = new Sales();
            sale.mes = "Febreo";
            sale.value = 10000000;
            sales.Add(sale);

            sale = new Sales();
            sale.mes = "Marzo";
            sale.value = 40000000;
            sales.Add(sale);

            sale = new Sales();
            sale.mes = "Abril";
            sale.value = 500000;
            sales.Add(sale);

            sale = new Sales();
            sale.mes = "Mayo";
            sale.value = 1300000;
            sales.Add(sale);

            sale = new Sales();
            sale.mes = "Junio";
            sale.value = 3700000;
            sales.Add(sale);

            sale = new Sales();
            sale.mes = "Julio";
            sale.value = 500000;
            sales.Add(sale);


            sale1.mes = "Enero";
            sale1.value = 10000000;
            sales1.Add(sale1);

            sale1 = new Sales();
            sale1.mes = "Febreo";
            sale1.value = 60000000;
            sales1.Add(sale1);

            sale1 = new Sales();
            sale1.mes = "Marzo";
            sale1.value = 50000000;
            sales1.Add(sale1);

            sale1 = new Sales();
            sale1.mes = "Abril";
            sale1.value = 200000;
            sales1.Add(sale1);

            sale1 = new Sales();
            sale1.mes = "Mayo";
            sale1.value = 1200000;
            sales1.Add(sale1);

            sale1 = new Sales();
            sale1.mes = "Junio";
            sale1.value = 500000;
            sales1.Add(sale1);

            sale1 = new Sales();
            sale1.mes = "Julio";
            sale1.value = 900000;
            sales1.Add(sale1);

            listSale.Add(sales);
            listSale.Add(sales1);


            var json = JsonConvert.SerializeObject(sales);

            return  json;           

        
        }
        public IActionResult Index()
        {
            ViewBag.Sales = test();

            List<List<Products>> listp = new List<List<Products>>();
            List<Products> products = new List<Products>();
            List<Products> products2 = new List<Products>();
            List<Products> products3 = new List<Products>();
            
            Products product = new Products();
            product.nameProduct = "cebolla";
            product.cantidad = 10;
            products.Add(product);

            product = new Products();
            product.nameProduct = "cilantro";
            product.cantidad = 40;
            products.Add(product);

            product = new Products();
            product.nameProduct = "Gallo";
            product.cantidad = 40;
            products.Add(product);
            product = new Products();
            product.nameProduct = "alberja";
            product.cantidad = 20;
            products.Add(product);

            product = new Products();
            product.nameProduct = "tomate";
            product.cantidad = 24;
            products.Add(product);

            Products product2 = new Products();
            product2.nameProduct = "cebolla";
            product2.cantidad = 50;
            products2.Add(product2);

            product2 = new Products();
            product2.nameProduct = "cilantro";
            product2.cantidad = 30;
            products2.Add(product2);

            product2 = new Products();
            product2.nameProduct = "Gallo";
            product2.cantidad = 20;
            products2.Add(product2);
            product2 = new Products();
            product2.nameProduct = "alberja";
            product2.cantidad = 15;
            products.Add(product2);

            product2 = new Products();
            product2.nameProduct = "tomate";
            product2.cantidad = 80;
            products2.Add(product2);

            Products product3 = new Products();
            product3.nameProduct = "cebolla";
            product3.cantidad = 1;
            products3.Add(product3);

            product3 = new Products();
            product3.nameProduct = "cilantro";
            product3.cantidad = 20;
            products3.Add(product3);

            product3 = new Products();
            product3.nameProduct = "Gallo";
            product3.cantidad = 10;
            products3.Add(product);
            product3 = new Products();
            product3.nameProduct = "alberja";
            product3.cantidad = 8;
            products3.Add(product3);

            product3 = new Products();
            product3.nameProduct = "tomate";
            product3.cantidad = 50;
            products3.Add(product3);

            var json = JsonConvert.SerializeObject(products);
            var json2 = JsonConvert.SerializeObject(products2);
            var json3 = JsonConvert.SerializeObject(products3);
            listp.Add(products);
            listp.Add(products2);
            listp.Add(products3);
            var jslsp = JsonConvert.SerializeObject(listp);
            ViewBag.Json = jslsp;
            

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}