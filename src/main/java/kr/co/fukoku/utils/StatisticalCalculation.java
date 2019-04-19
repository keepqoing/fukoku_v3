package kr.co.fukoku.utils;

import java.text.DecimalFormat;

import com.google.common.math.Stats;


public class StatisticalCalculation {

	public static double calCp(double[] dataset, double usl, double lsl) {
		double cp = 0;
		try {
			double a = usl - lsl;
			double b = 6 * calStandardDeviation(dataset);
			cp = a / b;
			cp = (Double.isInfinite(cp)) ? 0 : cp;
			cp = Double.parseDouble(new DecimalFormat("##.###").format(cp));
		} catch (Exception e) {
			System.out.println("  !!!!!!! Error StatisticalCalculation getCp() " + e.getMessage());
		}
		return cp;
	}
	
	public static double calCpk(double lsl, double usl, double target /* u */ , double cp) {
		double k = 0;
		double cpk = 0;
		try {
			double processMean = (usl + lsl) / 2  - target ;
			double specificationLimit = (usl - lsl) / 2;
			k = processMean / specificationLimit;
			cpk = (1 - k) * cp;
			if(cpk > 0) {
				cpk = (Double.isInfinite(cpk) ? 0 : Double.parseDouble(new DecimalFormat("##.###").format(cpk)));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cpk;
	}
	
	public static double calCpkOld(double lsl, double usl, double averageProductMaxRD, long workpieceLength) {
		double k = 0;
		try {
			double c = (usl - lsl) / 2;
			k = (c - averageProductMaxRD / workpieceLength) / c;
			k = (Double.isInfinite(k) ? 0 : Double.parseDouble(new DecimalFormat("##.###").format(k)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return k;
	}

	
	
	public static double calStandardDeviation (double[] dataset) {
		double stdv = 0;
		try {
			double standardDeviation = 0.0;
			double mean = Stats.meanOf(dataset);
			//System.out.println("mean : " + mean);
			for (int i = 0; i < dataset.length; i++) {
				standardDeviation += Math.pow(dataset[i] - mean, 2);
			}
			stdv = Double.parseDouble(new DecimalFormat("##.###").format(Math.sqrt(standardDeviation / (dataset.length - 1))));
		} catch (Exception e) {
			System.out.println("  !!!!!!! Error StatisticalCalculation getSDForSample() " + e.getMessage());
		}
		System.out.println("stdv : " + stdv);
		return stdv;
	}

	

	
	/* Compute an alternative sigma */
	public static double computeSigma2(double[] x, double target) {
		int nobs = x.length;
		double s2 = 0.0;
		for (int i = 0; i < nobs; i++) {
			s2 += (x[i] - target) * (x[i] - target);
		}
		s2 = Math.sqrt(s2 / (nobs - 1));
		return s2;
	}

	/* Compute the Capability Statistics */
	public static double[] computeCp(double lsl, double target, double usl, double mean, double sigma, double sigma2) {
		double[] cp = new double[9];
		/* Compute C_p. = (usl-lsl)/(6*stdev) */
		cp[0] = (usl - lsl) / (6. * sigma);
		
		/* Compute C_pl = (mean-lsl)/(3*stdev). */
		cp[1] = (mean - lsl) / (3. * sigma);
		
		/* Compute C_pu = (mean-lsl)/(3*stdev). */
		cp[2] = (usl - mean) / (3. * sigma);
		
		/* Compute K = ABS(((usl+lsl)/2)-mean)/(.5*(usl-lsl)). */
		//cp[3] = JMath.abs( ((usl + lsl) / 2.0) - mean) / (0.5 * (usl - lsl) );
		cp[3] = Math.abs(((usl + lsl) / 2.0) - mean) / (0.5 * (usl - lsl));
		
		/* Compute C_pk = (1-k)*C_p. <-- 'old' method */
		// cp[4] = (1-cp[3])*cp[0];
		/* Compute C_pk = min(Cpl, Cpu) */
		cp[4] = Math.min(cp[1], cp[2]);
		
		/* Compute C_pm */
		cp[5] = (usl - lsl) / (6. * sigma2);
		
		/* Compute Pp */
		cp[6] = (usl - lsl) / (6. * sigma);
		
		/* Compute Ppk */
		cp[7] = Math.min(cp[1], cp[2]);
		
		/* stdv **/
		cp[8] = sigma;
		
		return cp;
	}
	
	public static double[] processCapability(double getLsl, double getTarget,double getUsl,double[] observations ) {
		System.out.println(observations.length);
		double mean = Stats.meanOf(observations);
		double sigma = calStandardDeviation(observations);
		double sigma2 = computeSigma2(observations, getTarget);
		double[] cpstats = computeCp(getLsl, getTarget, getUsl, mean, sigma, sigma2);
		return cpstats;
	}
	
	public static boolean isInfinite(double value) {
        return !Double.isNaN(value) && !Double.isInfinite(value);
    }

	

}
