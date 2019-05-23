
import javax.ejb.EJBException;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

/**
 *
 * @author tss
 */
@Provider
public class EJBExceptionMapping implements ExceptionMapper<EJBException> {

    @Override
    public Response toResponse(EJBException ex) {
        return Response.status(Response.Status.BAD_REQUEST)
                .header("caused-by", "error in EJB objects")
                .build();
    }
    
}