package emsi.iir.exo;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/greeting")
public class GreetingServlet extends HttpServlet {
@Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    String name = request.getParameter("name");
    int age = Integer.parseInt(request.getParameter("age"));

    String majorite = (age >= 18) ? "Vous êtes majeur(e)." : "Vous êtes mineur(e).";
    response.setContentType("text/html");
    PrintWriter out = response.getWriter();
    out.println("<!DOCTYPE html>");
    out.println("<html><head><title>GreetingServlet</title></head>");
    out.println("<h2>Bonjour, "+name+"</h2>");
    out.println("<p>"+majorite+"</p>");
    out.println("</body></html>");


}
}
